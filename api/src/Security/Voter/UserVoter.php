<?php

namespace App\Security\Voter;

use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\Security;


class UserVoter extends Voter
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
        return in_array($attribute, ['CUSTOMER_EDIT', 'PROVIDER_EDIT', 'ADMIN_DELETE'])
            && $subject instanceof \App\Entity\User;
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
            case 'ADMIN_DELETE':
                if ($this->security->isGranted('ROLE_ADMIN')) {
                    return true;
                }
                break;
            case 'CUSTOMER_EDIT':
                if ($this->security->isGranted('ROLE_CUSTOMER')&& $subject->getCustomer()->getEmail() === $user->getEmail()) {
                    return true;
                }
                break;
            case 'PROVIDER_EDIT':
                if ($this->security->isGranted('ROLE_PROVIDER')&& $subject->getProvider()->getEmail() === $user->getEmail()) {
                    return true;
                }
                break;
        }

        return false;
    }
}
