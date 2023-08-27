<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreArticleVenteRequest;
use App\Http\Requests\UpdateArticleRequest;
use App\Http\Requests\UpdateArticleVenteRequest;
use App\Http\Resources\ArticleResource;
use App\Http\Resources\ArticleVenteCollection;
use App\Http\Resources\ArticleVenteResource;
use App\Models\Article;
use App\Models\ArticleVente;
use App\Models\Categorie;
use App\Models\ConfectionVente;
use Faker\Core\Number;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Termwind\Components\Element;

class ArticleVenteController extends Controller
{

    public $categorieExiste = [];
    public function __construct()
    {
        $this->categorieExiste = Categorie::whereIn("libelle", ["Tissu", "bouton", "Fils", "Tissus", "boutons"])->pluck("id");
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        
        $byPage = request()->query("item", 3);
        return new ArticleVenteCollection(ArticleVente::paginate($byPage));
    }


  

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreArticleVenteRequest $request)
    {
        // return array_map(function ($element) {
        //     return $element["article_id"];
        // }, $request->confection_by_vente);




        if (!$this->venteHasGoodConfgection(array_map(function ($element) {
            return $element["article_id"];
        }, $request->confection_by_vente))["status"]) {
            return $this->venteHasGoodConfgection(array_map(function ($element) {
                return $element["article_id"];
            }, $request->confection_by_vente));
        }
        if($request->marge > $request->prix_confection || $request->marge < 5000)
        {
            return ["message" => "Marge incoorecte", "data" => [], "status" => false];
        }
        try {
            DB::beginTransaction();
            $articleVente = new ArticleVente();
            $articleVente->libelle = ucfirst(strtolower($request->libelle));
            $articleVente->categorie_id = $request->categorie_id;
            $articleVente->promo = $request->promo;
            $articleVente->marge = $request->marge;
            $articleVente->prix_confection = $request->prix_confection;
            $articleVente->prix_vente = $request->prix_vente;
            $articleVente->photo = $request->photo;
            $articleVente->quantite_stock =  $request->quantite_stock;
            $articleVente->reference = $articleVente->getReference($request->categorie_id, $request->libelle);
            // return $articleVente->getReference($request->categorie_id, $request->libelle);
            if ($request->hasFile('photo')) {
                $fileName = time() . '.' . $request->photo->extension();
                $request->photo->storeAs('public/images', $fileName);
                $articleVente->photo = 'images/' . $fileName;
            }
            else 
            {
                $articleVente->photo = 'pas dispo';
            }

            $articleVente->save();

            // return $articleVente;
            $articleVente->articles()->attach($request->confection_by_vente);
            DB::commit();
            return ["message" => "Insertion réussi", "data" => [new ArticleVenteResource($articleVente)], "status" => true];
        } catch (\Throwable $th) {
            DB::rollBack();
            return ["message" => $th->getMessage(), "status" => false, "data" => []];
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(ArticleVente $articleVente)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateArticleVenteRequest $request)
    {
        $dataToupdate = [];
        $article = Article::where("id", $request->id)->first();
        if (isset($request->libelle)) {
            array_push($dataToupdate, ["libelle" => ucfirst(strtolower($request->libelle))]);
        }
        if (isset($request->categorie_id)) {
            array_push($dataToupdate, ["categorie_id" => $request->categorie_id]);
        }
        if (isset($request->promo)) {
            array_push($dataToupdate, ["promo" => $request->promo]);
        }
        if (isset($request->marge) && $request->marge <= $article->prix_confection && $request->marge >= 5000) {
           
                array_push($dataToupdate, ["marge" => $request->marge]);
            
        }
        if (isset($request->prix_confection)) {
            array_push($dataToupdate, ["prix_confection" => $request->prix_confection]);
        }
        if (isset($request->prix_vente)) {
            array_push($dataToupdate, ["prix_vente" => $request->prix_vente]);
        }
        if (isset($request->prix_vente)) {
            array_push($dataToupdate, ["prix_vente" => $request->prix_vente]);
        }
        if (isset($request->quantite_stock)) {
            array_push($dataToupdate, ["quantite_stock" => $request->quantite_stock]);
        }
        if (isset($request->reference)) {
            array_push($dataToupdate, ["reference" => $request->reference]);
        }
        if (isset($request->confection_by_vente)) {
            if ($this->venteHasGoodConfgection(array_map(function ($element) {
                return $element["article_id"];
            }, $request->confection_by_vente))) {
                $article->articles()->sync($request->confection_by_vente);
            }
        }
        if (isset($request->photo)) {
            if ($request->hasFile('photo')) {
                $fileName = time() . '.' . $request->photo->extension();
                $request->photo->storeAs('public/images', $fileName);
                array_push($dataToupdate, ["photo" => $fileName]);
            }
        }

        ArticleVente::where("id", $request->id)->update([$dataToupdate]);
        return ["message" => "Données mise à jours", "status" => true, "data" => new ArticleVenteResource(ArticleVente::find($request->id))];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        //
        Article::whereIn("id", [$request->articleVente])->delete();
        return ["message" => "Données supprimées", "status" => 200, "data" => []];
    }

    public function venteHasGoodConfgection($article_ids)
    {
        if (count($this->categorieExiste) < 3) {
            return ["message" => "Vous devez enregistrer au moins les categories tissus, boutons et fils pour pouvoir enregistrer un article de vente", "status" => false, "data" => []];
        }
        $articleConfection = Article::whereIn("categorie_id", [...$this->categorieExiste])->get();
        if (count($articleConfection) < 3) {
            return ["message" => "Vous devez avoir au moins un article de confection de categorie bouton, un autre de categorie fils et un autre de categorie tissu", "status" => false, "data" => []];
        }
        $array_mapped = array_map(function ($array_item) {
            return $array_item->id;
        }, [...$articleConfection]);
        $arrayIntersect = [...array_intersect([...$array_mapped], $article_ids)];
        if (count($arrayIntersect) < 3) {
            return ["message" => "Vous devez choisir au moins un article de confection de categorie tissue, un auitre de categorie bouton et un autre de categorie fils", "status" => false, "data" => []];
        }
        $filteredArticles = array_filter([...$articleConfection], function ($article) use ($arrayIntersect) {
            return in_array($article->id, $arrayIntersect);
        });
        $filteredArticles = array_map(function ($value) {
            return $value->categorie_id;
        }, [...$filteredArticles]);
        if (count(array_unique([...$filteredArticles])) < 3) {
            return ["meassage" => "Vous devez choisir au moins un article de confection de categorie tissue, un auitre de categorie bouton et un autre de categorie fils", "status" => false, "data" => []];
        }
        return ["message" => '', "status" => true, "data" => []];
    }

    public function search(Request $request)
    {
        return ["message" => "", "status" => true, "data" => ArticleVenteResource::collection(ArticleVente::where("libelle","like", $request->libelle."%")->get())];
    }


    // public funct
}
