<?php

declare(strict_types=1);

namespace App\Controller;

use App\Repository\ArticleRepository;
// use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Request;
use App\Entity\User;


final class RequestController extends AbstractController
{
    /**
     * @Route("/requests/{id}/provider", name="provider_product")
     */
    public function getListRequestsByProvider(int $id): Response
    {  
        $entityManager = $this->getDoctrine()->getManager();
        $provider = $entityManager->getRepository(User::class)->find($id);
        $requests = $entityManager->getRepository(Request::class)->findBy(['provider' => $provider]);
        return $this->json($requests);
    }

    /**
     * @Route("/requests/{id}/user", name="user_requests")
     */
    public function getListRequestsByUser(int $id): Response
    {
        $entityManager = $this->getDoctrine()->getManager();
        $cutomer = $entityManager->getRepository(User::class)->find($id);
        $requests = $entityManager->getRepository(Request::class)->findBy(['user' => $cutomer]);
        return $this->json($requests);
    }
}