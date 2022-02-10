<?php
// api/src/Controller/BookController.php

namespace App\Controller;

use App\Entity\User;

class ProviderCreateController
{
    public function __invoke(User $data)
    {
        return $data->setRoles(['ROLE_PROVIDER']);
    }
    
}