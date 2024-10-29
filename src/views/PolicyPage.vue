<script lang="ts" setup>

import {ref} from "vue";

const hasSubscription = ref(true);
const openSubscriptionSettingsModal = ref(false);

</script>

<template>
  <div class="content flex flex-column p-4 overflow-y-scroll"
       style="min-height: 85%; gap: 0.65em">
    <div class="text-2xl">Politique de Confidentialité</div>
    <p>Bienvenue dans la politique de confidentialité de notre application. Nous nous engageons à protéger la
      confidentialité et la sécurité de vos informations personnelles.</p>

    <div class="text-xl">1. Informations que Nous Collectons</div>
    <p>Nous collectons différents types d'informations pour fournir et améliorer notre service.</p>
    <ul>
      <li>Informations d'identification personnelle (nom, adresse e-mail, numéro de téléphone, etc.)</li>
      <li>Données d'utilisation (interactions avec notre service, adresse IP, type de navigateur, etc.)</li>
    </ul>

    <div class="text-2xl">2. Utilisation des Données</div>
    <p>Les informations collectées sont utilisées pour :</p>
    <ul>
      <li>Fournir et maintenir notre service</li>
      <li>Améliorer notre application et développer de nouvelles fonctionnalités</li>
      <li>Protéger les utilisateurs et assurer la sécurité de nos services</li>
    </ul>

    <div class="text-2xl">3. Partage des Données</div>
    <p>Nous ne partageons vos informations qu'avec des tiers dans les cas suivants :</p>
    <ul>
      <li>Lorsque cela est nécessaire pour fournir le service</li>
      <li>Pour se conformer à des obligations légales</li>
      <li>Avec votre consentement explicite</li>
    </ul>

    <div class="text-2xl">4. Sécurité des Données</div>
    <p>Nous prenons des mesures raisonnables pour protéger vos données personnelles. Toutefois, aucune méthode de
      transmission ou de stockage n'est sécurisée à 100 %.</p>

    <div class="text-2xl">5. Vos Droits</div>
    <p>Vous avez le droit de :</p>
    <ul>
      <li>Accéder à vos données personnelles</li>
      <li>Demander la correction ou la suppression de vos informations</li>
      <li>Vous opposer à certains traitements de vos données</li>
    </ul>

    <div v-if="hasSubscription" class="text-2xl">6. Gestion de mon abonnement</div>
    <div v-if="hasSubscription" class="w-full pb-2">
      <p>
        <span class="mr-1">Vous pouvez</span>
        <span class="mr-1 cursor-pointer font-medium" @click="openSubscriptionSettingsModal = true">gérer</span>
        <span
            class="mr-1">votre abonnement à tout moment pour modifier vos préférences et vos informations de paiement.</span>
      </p>
      <Button class="w-full" label="Continuer" severity="contrast" @click="$router.push({name: 'Subscription'})"/>
    </div>

    <div class="text-2xl">7. Modifications de la Politique de Confidentialité</div>
    <p>
      Nous pouvons mettre à jour cette politique de confidentialité de temps en temps. Nous vous informerons de tout
      changement en publiant la nouvelle politique sur cette page.
    </p>

    <Dialog v-model:visible="openSubscriptionSettingsModal" class="m-4" header="Paramètres" modal style="width: 350px;">
      <div class="flex flex-column gap-3" style="max-height: 290px;">
        <div class="flex flex-column gap-2">
          <div class="text-lg font-semibold">Gestion de votre abonnement</div>
          <div class="text-sm">
            Abonnement à 13,99€/mois.
          </div>
        </div>

        <div class="flex flex-column gap-2">
          <div class="text-lg">
            Grâce à votre abonnement, vous avez accès à des produits exclusifs et des offres spéciales.
          </div>
        </div>

        <div class="flex flex-column gap-2">
          <div class="text-lg font-semibold">Vous souhaitez partir ? Ho non fait pas ça</div>
          <div class="text-sm">
            Notre abonnement a été fait pour vous. Vous être prioritaire pour les offres spéciales et les produits.
            Vous êtes vraiment sur de vouloir partir ?
          </div>
          <div class="flex flex-column gap-4 justify-content-end">
            <Button label="Je ne veux plus" severity="success" @click="openSubscriptionSettingsModal = false"/>
            <div>
              <Button label="Oui" severity="danger" size="small" @click="$router.push({name: 'UnSubscribe'})"/>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<style scoped>

</style>