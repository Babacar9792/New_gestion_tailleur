<?php

namespace App\Http\Resources;

use App\Models\Categorie;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleVenteResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
            "id" => $this->id,
            "libelle" => $this->libelle,
            "categorie" => new CategorieResource($this->categorie),
            "confection_vente" => ArticleResource::collection($this->articles),
            "quantite_stock" => $this->quantite_stock
         ];
    }
}
