<?php

namespace App\Controller;

use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class UserConnectedController
{
    private $tokenStorage;

    public function __construct(TokenStorageInterface $tokenStorage)
    {
        $this->tokenStorage = $tokenStorage;
    }

    public function __invoke()
    {
        $user = $this->tokenStorage->getToken();
        return $user;
    }

}