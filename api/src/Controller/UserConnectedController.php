<?php

namespace App\Controller;

use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\JsonResponse;


class UserConnectedController
{
    private $tokenStorage;

    public function __construct(Security $tokenStorage)
    {
        $this->tokenStorage = $tokenStorage;
    }

    public function __invoke()
    {
        $user = $this->tokenStorage->getToken()->getUser();
        $data = ['email' => $user->getEmail(),'roles' => $user->getRoles()];
        return new JsonResponse($data);
    }

}