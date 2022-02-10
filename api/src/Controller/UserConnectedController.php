<?php

namespace App\Controller;

use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;



class UserConnectedController
{
    private $tokenStorage;
    private $em;

    public function __construct(Security $tokenStorage,EntityManagerInterface $em)
    {
        $this->tokenStorage = $tokenStorage;
        $this->em = $em;
    }
    public function __invoke()
    {
        $user = $this->tokenStorage->getToken()->getUser();
        $userObject = $this->em->getRepository('App:User')->findBy(['email' => $user->getEmail()]);
        $data = [
            'email' => $userObject[0]->getEmail(),
            'roles' => $userObject[0]->getRoles(),
            'id' => $userObject[0]->getId(),
            'firstname' => $userObject[0]->getFirstname(),
            'lastname' => $userObject[0]->getLastname(),
        ];
        return new JsonResponse($data);
    }

}