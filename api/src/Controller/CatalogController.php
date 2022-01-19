<?php

declare(strict_types=1);

namespace App\Controller;

use App\Repository\ArticleRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Product;
use App\Entity\Catalog;


final class CatalogController extends AbstractController
{
    /**
     * @Route("/catalog/{id}/product", name="catalog_product")
     */
    public function createProductCatalog(Request $request, int $id): Response
    {  
        $body = json_decode($request->getContent(), true);
        $entityManager = $this->getDoctrine()->getManager();
        $catalog = $entityManager->getRepository(Catalog::class)->find($id);
        $product = new Product();
        $product->setName($body["name"]);
        $product->setWeight($body["weight"]);
        $product->setDescription($body["description"]);
        $product->setPrice($body["price"]);
        $product->setQuantity($body["quantity"]);
        $catalog->addProduct($product);
        $entityManager->persist($product);
        $entityManager->flush();
        return $this->json('Saved new product with id '.$product->getId());
    }
}