<?php

namespace App\Security\Voter;

use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\Security;


class RequestVoter extends Voter
{
    private $security = null;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    protected function supports($attribute, $subject)
    {
        // replace with your own logic
        // https://symfony.com/doc/current/security/voters.html
        return in_array($attribute, ['REQUEST_CREATE', 'REQUEST_READ', 'REQUEST_EDIT', 'REQUEST_DELETE'])
            && $subject instanceof \App\Entity\Request;
    }

    protected function voteOnAttribute($attribute, $subject, TokenInterface $token)
    {
        $user = $token->getUser();
        // if the user is anonymous, do not grant access
        if (!$user instanceof UserInterface) {
            return false;
        }

        // ... (check conditions and return true to grant permission) ...
        switch ($attribute) {
            case 'REQUEST_CREATE':
                if ($this->security->isGranted('ROLE_CUSTOMER')) {
                    return true;
                }
                break;
            case 'REQUEST_DELETE':
                if ($this->security->isGranted('ROLE_CUSTOMER') && $subject->getCustomer()->getEmail() === $user->getEmail()) {
                    return true;
                }
                break;

            case 'REQUEST_EDIT':
                if ($this->security->isGranted('ROLE_CUSTOMER') && $subject->getCustomer()->getEmail() === $user->getEmail()) {
                    return true;
                }
                break;
        }

        return false;
    }
}
