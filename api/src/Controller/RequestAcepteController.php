<?php

namespace App\Controller;

use App\Entity\Request;

class RequestAcepteController
{
    public function __invoke(Request $data)
    {
        $data->setStatus('accept');
        return $data; 
    }
}