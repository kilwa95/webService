<?php

namespace App\Controller;

use Symfony\Component\Security\Core\Security;

class UserConnectedController
{
    private $tokenStorage;

    public function __construct(Security $tokenStorage)
    {
        $this->tokenStorage = $tokenStorage;
    }

    public function __invoke()
    {
        // $user = $this->tokenStorage->getToken()->getUser();
    }

}