<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Repository\ProductRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass=ProductRepository::class)
 * @ApiFilter(SearchFilter::class, properties={"id": "exact","name": "partial","description": "partial"})
 */
class Product
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"read:product:collection","read:user:collection","read:request:collection"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"read:product:collection","write:product:collection","edit:product:item","read:user:collection","read:request:collection","read:catalog:collection"})
     */
    private $name;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @Groups({"read:product:collection","write:product:collection","edit:product:item","read:request:collection","read:catalog:collection"})
     */
    private $weight;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"read:product:collection","write:product:collection","edit:product:item","read:request:collection","read:catalog:collection"})
     */
    private $description;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createAt;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"read:product:collection"})
     */
    private $enable;

    /**
     * @ORM\ManyToMany(targetEntity=Request::class, mappedBy="products")
     */
    private $requests;

    /**
     * @ORM\ManyToMany(targetEntity=Catalog::class, mappedBy="products")
     */
    private $catalogs;

    /**
     * @Groups({"read:catalog:collection"})
     * @ORM\Column(type="float")
     */
    private $price;

    /**
     * @Groups({"read:catalog:collection"})
     * @ORM\Column(type="integer")
     */
    private $quantity;

    public function __construct()
    {
        $this->createAt = new \DateTime();
        $this->enable = true;
        $this->requests = new ArrayCollection();
        $this->catalogs = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getWeight(): ?float
    {
        return $this->weight;
    }

    public function setWeight(?float $weight): self
    {
        $this->weight = $weight;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getCreateAt(): ?\DateTimeInterface
    {
        return $this->createAt;
    }

    public function setCreateAt(\DateTimeInterface $createAt): self
    {
        $this->createAt = $createAt;

        return $this;
    }

    public function getEnable(): ?bool
    {
        return $this->enable;
    }

    public function setEnable(bool $enable): self
    {
        $this->enable = $enable;

        return $this;
    }

    /**
     * @return Collection|Request[]
     */
    public function getRequests(): Collection
    {
        return $this->requests;
    }

    public function addRequest(Request $request): self
    {
        if (!$this->requests->contains($request)) {
            $this->requests[] = $request;
            $request->addProduct($this);
        }

        return $this;
    }

    public function removeRequest(Request $request): self
    {
        if ($this->requests->contains($request)) {
            $this->requests->removeElement($request);
            $request->removeProduct($this);
        }

        return $this;
    }

    /**
     * @return Collection|Catalog[]
     */
    public function getCatalogs(): Collection
    {
        return $this->catalogs;
    }

    public function addCatalog(Catalog $catalog): self
    {
        if (!$this->catalogs->contains($catalog)) {
            $this->catalogs[] = $catalog;
            $catalog->addProduct($this);
        }

        return $this;
    }

    public function removeCatalog(Catalog $catalog): self
    {
        if ($this->catalogs->contains($catalog)) {
            $this->catalogs->removeElement($catalog);
            $catalog->removeProduct($this);
        }

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getQuantity(): ?int
    {
        return $this->quantity;
    }

    public function setQuantity(int $quantity): self
    {
        $this->quantity = $quantity;

        return $this;
    }
}
