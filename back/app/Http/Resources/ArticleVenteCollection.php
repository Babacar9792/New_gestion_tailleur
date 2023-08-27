<?php

namespace App\Http\Resources;

use App\Models\Categorie;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ArticleVenteCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
            "data" => $this->collection,
            "categories" => CategorieResource::collection(Categorie::where("type_categorie", "AV")->get())

        ];
    }

    public function paginationInformation($request, $paginated, $default)
    {
        return ["links" => $default["meta"]['links']];
        // dd($default);
    }

    
}
