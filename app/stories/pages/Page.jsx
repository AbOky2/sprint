import React from 'react';
import { Typo } from '../../components/form/Typo';

export const Page = () => {
  const [user, setUser] = React.useState();

 return (
<>
 




<div className="flex flex-col space-x-3 items-start justify-center p-4 bg-white border rounded-xl border-blue-500 w-96">
    <div className="flex justify-center items-start x-_388 h-_808 relative gap-3 p-4 rounded-xl bg-white ">
        <p className="flex-grow w-_259 text-sm font-bold text-left text-blue-500">
          2 pièces (3 logements disponibles)
        </p>
        <svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex-grow-0 flex-shrink-0 w-6 h-6 relative"
          preserveAspectRatio="none"
        >
          <path
            d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
            stroke="#3679FF"
            stroke-width={2}
            stroke-miterlimit={10}
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8 12H16"
            stroke="#3679FF"
            stroke-width={2}
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>

      <svg
    width={311}
    height={1}
    viewBox="0 0 311 1"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    className='mb-8'
  >
    <line x1="-4.37114e-8" y1="0.5" x2={311} y2="0.499973" stroke="#CDD2D8" />
  </svg>

<div className='flex'>
<p className="w-44 h-5 text-xs font-medium">Prix TVA 20%</p>
<p className="w-44 h-5 text-xs font-medium">271 000€</p>
</div>
<div className='flex'>
<p className="w-44 h-5 text-xs font-medium">Surface</p>
<p className="w-44 h-5 text-xs font-medium">63m2</p>
</div>
<div className='flex'>
<p className="w-44 h-5 text-xs font-medium">Étage</p>
<p className="w-44 h-5 text-xs font-medium">RDC</p>
</div>
<div className='flex'>
<p className="w-44 h-5 text-xs font-medium">Orientation</p>
<p className="w-44 h-5 text-xs font-medium">Sud</p>

</div>
<div className='flex'>
<p className="w-44 h-5 text-xs font-medium">Parking</p>
<p className="w-44 h-5 text-xs font-medium">2 inclus</p>
</div>
<div className='flex'>
<p className="w-44 h-5 text-xs font-medium">Les +</p>
<p className="w-44 h-5 text-xs font-medium">-</p></div>


<div
    className="flex justify-center items-center w-_344 relative gap-2.5 px-32 py-4 rounded-xl mb-10 mt-8"
    style={{ background: "linear-gradient(to bottom, #81a3f9 -0.06%, #3462d8 108.09%)" }}
  >
    <p className="flex-grow-0 flex-shrink-0 text-sm font-bold text-left text-white">
      Télécharger le plan en 2D
    </p>
  </div>

</div>





{/*
<div className="px-4">
  <div className="flex justify-center items-start x-_388 h-_808 relative gap-3 p-4 rounded-xl bg-white border border-gray-400 mb-4">
    <p className="flex-grow w-_259 text-sm font-bold text-left text-blue-500">
      2 pièces (3 logements disponibles)
    </p>
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-grow-0 flex-shrink-0 w-6 h-6 relative"
      preserveAspectRatio="none"
    >
      <path
        d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
        stroke="#3679FF"
        stroke-width={2}
        stroke-miterlimit={10}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8 12H16"
        stroke="#3679FF"
        stroke-width={2}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
  <svg
    width={311}
    height={1}
    viewBox="0 0 311 1"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
  >
    <line x1="-4.37114e-8" y1="0.5" x2={311} y2="0.499973" stroke="#CDD2D8" />
  </svg>
  
  <div className='flex flex-col mt-8'>
  <p className=" w-_174 h-_23 text-xs font-medium text-left text-black">Prix TVA 20%</p>
  <p className=" w-_174 h-_23 text-xs font-medium text-right text-black">271 000€</p>
  <p className=" w-_174 h-_23 text-xs font-medium text-right text-black">63m2</p>
  <p className=" w-_174 h-_23 text-xs font-medium text-right text-black">RDC</p>
  <p className=" w-_174 h-_23 text-xs font-medium text-right text-black">Sud</p>
  <p className=" w-_174 h-_23 text-xs font-medium text-left text-black">Surface</p>
  <p className=" w-_174 h-_23 text-xs font-medium text-left text-black">Étage</p>
  <p className=" w-_174 h-_23 text-xs font-medium text-left text-black">Orientation</p>
  <p className=" w-_174 h-_23 text-xs font-medium text-right text-black">2 inclus</p>
  <p className=" w-_174 h-_23 text-xs font-medium text-right text-black">-</p>
  <p className=" w-_174 h-_23 text-xs font-medium text-left text-black">Parking</p>
  <p className=" w-_174 h-_23 text-xs font-medium text-left text-black">Les +</p>
  </div>

  <div
    className="flex justify-center items-center w-_344 relative gap-2.5 px-32 py-4 rounded-xl mb-10 mt-8"
    style={{ background: "linear-gradient(to bottom, #81a3f9 -0.06%, #3462d8 108.09%)" }}
  >
    <p className="flex-grow-0 flex-shrink-0 text-sm font-bold text-left text-white">
      Télécharger le plan en 2D
    </p>
  </div>
  <svg
    width={311}
    height={1}
    viewBox="0 0 311 1"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
  >
    <line x1="-4.37114e-8" y1="0.5" x2={311} y2="0.499973" stroke="#CDD2D8" />
  </svg>

  <div className='mt-8'>
  <p className=" w-_174 h-_23 text-xs font-medium text-left text-black">TVA réduite 5.5%</p>
  <p className=" w-_174 h-_23 text-xs font-medium text-right text-black">208 000€</p>
  <p className=" w-_174 h-_23 text-xs font-medium text-right text-black">63m2</p>
  <p className=" w-_174 h-_23 text-xs font-medium text-right text-black">RDC</p>
  <p className=" w-_174 h-_23 text-xs font-medium text-right text-black">Sud</p>
  <p className=" w-_174 h-_23 text-xs font-medium text-left text-black">Surface</p>
  <p className=" w-_174 h-_23 text-xs font-medium text-left text-black">Étage</p>
  <p className=" w-_174 h-_23 text-xs font-medium text-left text-black">Orientation</p>
  <p className=" w-_174 h-_23 text-xs font-medium text-right text-black">2 inclus</p>
  <p className=" w-_174 h-_23 text-xs font-medium text-left text-black">Parking</p>
  </div>

  <div
    className="flex justify-center items-center w-_344 relative gap-2.5 px-32 py-4 rounded-xl mt-8 mb-10"
    style={{ background: "linear-gradient(to bottom, #81a3f9 -0.06%, #3462d8 108.09%)" }}
  >
    <p className="flex-grow-0 flex-shrink-0 text-sm font-bold text-left text-white">
      Télécharger le plan en 2D
    </p>
  </div>
  <svg
    width={311}
    height={1}
    viewBox="0 0 311 1"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
  >
    <line x1="-4.37114e-8" y1="0.5" x2={311} y2="0.499973" stroke="#CDD2D8" />
  </svg>
  <div className='mt-8'>
  <p className=" w-_174 h-_23 text-xs font-medium text-left text-black">Prix TVA 20%</p>
  <p className=" w-_174 h-_23 text-xs font-medium text-right text-black">271 000€</p>
  <p className=" w-_174 h-_23 text-xs font-medium text-right text-black">63m2</p>
  <p className=" w-_174 h-_23 text-xs font-medium text-right text-black">RDC</p>
  <p className=" w-_174 h-_23 text-xs font-medium text-right text-black">Sud</p>
  <p className=" w-_174 h-_23 text-xs font-medium text-left text-black">Surface</p>
  <p className=" w-_174 h-_23 text-xs font-medium text-left text-black">Étage</p>
  <p className=" w-_174 h-_23 text-xs font-medium text-left text-black">Orientation</p>
  <p className=" w-_174 h-_23 text-xs font-medium text-right text-black">2 inclus</p>
  <p className=" w-_174 h-_23 text-xs font-medium text-right text-black">-</p>
  <p className=" w-_174 h-_23 text-xs font-medium text-left text-black">Parking</p>
  <p className=" w-_174 h-_23 text-xs font-medium text-left text-black">Les +</p>
  </div>
  <div
    className="flex justify-center items-center  w-_344 relative gap-2.5 px-32 py-4 rounded-xl mt-8"
    style={{ background: "linear-gradient(to bottom, #81a3f9 -0.06%, #3462d8 108.09%)" }}
  >
    <p className="flex-grow-0 flex-shrink-0 text-sm font-bold text-left text-white">
      Télécharger le plan en 2D
    </p>
  </div>
  
</div>

 */}












{/*
<div>
  <div className=" w-_536 h-_175">
    <p className="absolute left-_584 top-_736 text-2xl font-bold">
      Résidence Bienvivre
    </p>
    <p className="absolute left-_604 top-_772 text-sm font-bold text-center text-gray-500">
      Buzenval - 92500 Rueil-Malmaison
    </p>
    <div className=" w-_295 h-24 absolute left-_452 top-_814 rounded-xl bg-white border border-blue-200">
      <p className="absolute left-_65 top-6 text-lg font-bold text-center text-gray-600">
        de 3 à 4 pièces
      </p>
      <p className="absolute left-_60 top-_51 text-lg font-bold text-center text-gray-600">
        de 61 m² à 75 m²
      </p>
    </div>
    <div className=" w-_259 h-24 absolute left-_727 top-_814 rounded-xl bg-white border border-blue-200">
      <p className=" w-_200 h-_23 absolute left-_30 top-_23 text-lg font-bold text-center text-blue-500">
        à partir de 271 000 €
      </p>
      <p className=" w-_200 h-_23 absolute left-_30 top-_51 text-lg font-bold text-center text-blue-500">
        soit 700 €/mois
      </p>
    </div>
  </div>

  <div
    className="flex flex-col justify-start items-start w-_344 relative gap-2 p-6 rounded-xl"
    style={{
      background:
        "linear-gradient(219.21deg, rgba(195,153,219,0.1) -0.85%, rgba(88,130,247,0.1) 106.68%)",
    }}
  >
    <svg
      width={34}
      height={34}
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-grow-0 flex-shrink-0 w-_34 h-_34px"
      preserveAspectRatio="none"
    >
      <rect width={34} height={34} rx={11} fill="url(#paint0_linear_483_5298)" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M19.3093 20.2255L19.3067 20.2299C18.9347 20.864 18.814 21.3314 18.814 21.659C18.814 22.0235 18.9112 22.3112 19.0953 22.5637C19.3575 22.9055 19.6134 23.1273 19.8531 23.2662C20.2786 23.5015 20.6704 23.7317 21.0274 23.9571C21.2306 24.0775 21.4454 24.2241 21.6245 24.4022C21.7801 24.5568 22.093 24.9159 22.093 25.4509C22.093 25.9671 21.8425 26.4492 21.3709 26.7339C20.993 26.9619 20.5759 27 20.2791 27C19.1488 27 18.0677 26.391 17.0768 25.5393L17.0731 25.5361L17.0694 25.5329C16.6386 25.1563 16.2748 24.7451 15.9927 24.3005C15.4091 25.029 14.9705 25.556 14.6824 25.8728C14.4477 26.139 14.2122 26.3787 13.9822 26.5617C13.8657 26.6544 13.7257 26.7526 13.5665 26.8317C13.4158 26.9067 13.1775 27 12.8837 27C12.1038 27 11.6258 26.4682 11.386 26.0867L11.3639 26.0515L11.3444 26.0149C11.134 25.6197 11 25.1807 11 24.711C11 24.5215 11.039 24.3098 11.0688 24.1605C11.1049 23.9802 11.1562 23.7588 11.2203 23.502C11.3487 22.987 11.5387 22.2894 11.7878 21.4146C12.2737 19.6935 12.7632 17.6195 13.2554 15.1881C13.7402 12.7934 13.9767 10.6597 13.9767 8.78035C13.9767 8.61642 13.9864 8.43563 14.0205 8.25767C14.0489 8.10986 14.1129 7.85737 14.2902 7.61714C14.6825 7.06796 15.2979 7 15.6047 7C16.0789 7 16.4395 7.22144 16.6694 7.43104C16.8844 7.62698 17.0454 7.86369 17.1685 8.08381C17.4693 8.57753 17.6279 9.12462 17.6279 9.7052C17.6279 11.9123 17.2441 14.5966 16.4948 17.7446C17.4134 16.5573 18.2225 15.5926 18.9207 14.8551L18.9235 14.8521L18.9263 14.8492C19.2646 14.4968 19.5707 14.2025 19.8353 13.9882C19.9663 13.882 20.1134 13.7739 20.2688 13.6867C20.3917 13.6178 20.6689 13.474 21.0233 13.474C21.6186 13.474 22.0901 13.7566 22.4206 14.1071C22.6608 14.3499 23 14.7797 23 15.3699C23 15.6902 22.8756 15.9368 22.8246 16.0328C22.7569 16.1603 22.6756 16.2767 22.6016 16.3739C22.4519 16.5707 22.2521 16.792 22.0226 17.0284C21.5875 17.4764 21.106 17.9706 20.5782 18.5107C20.1288 18.9707 19.7049 19.5372 19.3119 20.221L19.3093 20.2255ZM20.346 24.6843C20.346 24.6843 20.343 24.685 20.3363 24.6857C20.3425 24.6845 20.346 24.6843 20.346 24.6843Z"
        fill="white"
      />
      <defs>
        <lineargradient
          id="paint0_linear_483_5298"
          x1="32.375"
          y1="-1.5625"
          x2="2.06411e-7"
          y2="38.125"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#C399DB" />
          <stop offset={1} stop-color="#5882F7" />
        </lineargradient>
      </defs>
    </svg>
    <p className="flex-grow-0 flex-shrink-0 w-_295 text-lg font-bold text-left">
      Le mot de Kit le nid.
    </p>
    <p className="self-stretch flex-grow-0 flex-shrink-0  w-_295 text-sm font-medium text-left text-gray-500">
      Kit le nid aime bien faire des prouts dans les logements, et ça tombe bien parce que il y a un
      piano livré avec l’appartement ! À vous les gateaux aux chocolats mmmm !
    </p>
  </div>
  <div className="flex flex-col justify-start items-start w-96 relative gap-2 p-6 rounded-xl bg-white border border-gray-300">
    <p className="flex-grow-0 flex-shrink-0 w-72 text-lg font-bold text-left text-blue-500">
      À propos de cette résidence
    </p>
    <p className="self-stretch flex-grow-0 flex-shrink-0 w-72 text-sm font-medium text-left text-gray-500">
      Démarrage travaux imminent ! Votre appartement à partir de 205 000 euros. Dans un équilibre
      parfait entre “Vivre au vert et vivre ensemble “, découvrez notre programme GAIA
    </p>
  </div>
  <div className="flex flex-col justify-start items-start w-96 relative gap-2 p-6 rounded-xl bg-white border border-gray-300">
    <p className="flex-grow-0 flex-shrink-0 w-72 text-lg font-bold text-left text-indigo-900">
      La Banque Postale peut sûrement financer ton projet !
    </p>
    <p className="self-stretch flex-grow-0 flex-shrink-0 w-72 text-sm font-medium text-left text-gray-500">
      Kit le nid et La Banque Postale s’unissent pour t’aider à voler de tes propres ailes.
    </p>
    <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-2.5 px-10 py-3 rounded-xl border border-[#3679ff]">
      <p className="flex-grow-0 flex-shrink-0 text-sm font-bold text-left text-blue-500">
        Découvrir
      </p>
    </div>
  </div>
  <div className="flex flex-col justify-center items-center w-_344 relative gap-2 p-6 rounded-xl bg-white border border-blue-200">
    <p className="flex-grow-0 flex-shrink-0 w-_295 text-lg font-bold text-center text-blue-500">
      Transports à proximités
    </p>
    <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-3">
      <div className="flex-grow-0 flex-shrink-0 w-6 h-6 relative">
        <img src="image-95.png" className="w-6 h-6 absolute -left-0.5 -top-0.5 object-cover" />
      </div>
      <div className="flex-grow-0 flex-shrink-0 w-6 h-6 relative">
        <img src="image-93.png" className="w-6 h-6 absolute -left-0.5 -top-0.5 object-cover" />
      </div>
      <div className="flex-grow-0 flex-shrink-0 w-6 h-6 relative">
        <img src="image-92.png" className="w-6 h-6 absolute -left-0.5 -top-0.5 object-cover" />
      </div>
      <div className="flex-grow-0 flex-shrink-0 w-6 h-6 relative">
        <img src="image-94.png" className="w-6 h-6 absolute -left-0.5 -top-0.5 object-cover" />
      </div>
    </div>
  </div>
  <div className=" w-_712 h-_411">
    <div
      className="w-_712 h-_411 absolute left-_545 top-_942 rounded-xl bg-white"
      style={{
        boxShadow: "0px 4px 6px -4px rgba(24,39,75,0.12), 0px 8px 8px -4px rgba(24,39,75,0.08)",
      }}
    />
    <div className=" w-_388 h-_68">
      <p className=" w-_216 h-2.5 absolute left-_793 top-_1314 text-sm font-medium text-left text-gray-500">
        ou appeler le 06 65 07 11 66
      </p>
      <div
        className="flex justify-center items-center w-_388 absolute left-_707 top-_1255 gap-2.5 px-32 py-4 rounded-xl"
        style={{ background: "linear-gradient(to bottom, #81a3f9 -0.06%, #3462d8 108.09%)" }}
      >
        <p className="flex-grow-0 flex-shrink-0 text-sm font-bold text-left text-white">
          Être rappelé selon mes dispos
        </p>
      </div>
    </div>
    <div className="flex justify-end items-center w-_664 absolute left-_569 top-_987 gap-3 p-4 rounded-xl bg-white border border-blue-500">
      <p className="flex-grow w-_596 text-sm font-bold text-left text-blue-500">
        3 logement disponible.
      </p>
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-grow-0 flex-shrink-0 w-6 h-6 relative"
        preserveAspectRatio="none"
      >
        <path
          d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
          stroke="#3679FF"
          stroke-width={2}
          stroke-miterlimit={10}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8 12H16"
          stroke="#3679FF"
          stroke-width={2}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <div className="w-_46 h-_153">
      <p className="absolute left-_571 top-8 text-sm text-center text-blue-600">
        Studio
      </p>
      <p className="absolute left-_571 top-8 text-sm text-center text-blue-600">
        Studio
      </p>
      <p className="absolute left-_571 top-8 text-sm text-center text-blue-600">
        Studio
      </p>
      <p className="absolute left-_571 top-8 text-sm text-center text-blue-600">
        Studio
      </p>
      <p className="absolute left-_579 top-8 text-xs font-bold text-left text-[#4f80ff]">
        Type
      </p>
    </div>
    <div className=" w-_74 h-_153 mb-8">
      <p className="absolute left-_636 top-_1093 text-sm text-center text-blue-600">
        230 000€
      </p>
      <p className="absolute left-_636 top-_1127 text-sm text-center text-blue-600">
        260 000€
      </p>
      <p className="absolute left-_636 top-_1161 text-sm text-center text-blue-600">
        280 000€
      </p>
      <p className="absolute left-_636 top-_1195 text-sm text-center text-blue-600">
        290 000€
      </p>
      <p className="absolute left-_636 top-_1060 text-xs font-bold text-center text-[#4f80ff]">
        Prix TVA 20%
      </p>
    </div>
    <div className=" w-_46 h-_153">
      <p className="absolute left-_728 top-_1093 text-sm text-center text-blue-600">26m²</p>
      <p className="absolute left-_728 top-_1127 text-sm text-center text-blue-600">28m²</p>
      <p className="absolute left-_728 top-_1161 text-sm text-center text-blue-600">29m²</p>
      <p className="absolute left-_728 top-_1195 text-sm text-center text-blue-600">30m²</p>
      <p className="absolute left-_722 top-_1060 text-xs font-bold text-left text-[#4f80ff]">
        Surface
      </p>
    </div>
    <div className=" w-_81 h-_153">
      <div className="w-_81 h-_120">
        <p className="absolute left-_811 top-_1093 text-sm text-center text-blue-600">RDC</p>
        <p className="absolute left-_793 top-_1127 text-sm text-center text-blue-600">
          1er étage
        </p>
        <p className="absolute left-_793 top-_1161 text-sm text-center text-blue-600">
          1er étage
        </p>
        <p className="absolute left-_784 top-_1195 text-sm text-center text-blue-600">
          2ème étage
        </p>
      </div>
      <p className="absolute left-_808 top-_1060 text-xs font-bold text-left text-[#4f80ff]">
        Étage
      </p>
    </div>
    <div className=" w-_81 h-_153">
      <p className="w-_81 absolute left-_881 top-_1093 text-sm text-center text-blue-600">
        Sud
      </p>
      <p className="w-_81 absolute left-_881 top-_1127 text-sm text-center text-blue-600">
        Ouest
      </p>
      <p className="w-_81 absolute left-_881 top-_1161 text-sm text-center text-blue-600">
        Nord
      </p>
      <p className="w-_81 absolute left-_881 top-_1195 text-sm text-center text-blue-600">
        Est
      </p>
      <p className="absolute left-_890 top-_1060 text-xs font-bold text-left text-[#4f80ff]">
        Orientation
      </p>
    </div>
    <div className=" w-_46 h-_153 mb-8 mt-8">
      <p className="absolute left-_981 top-_1093 text-sm text-center text-blue-600">
        Balcon
      </p>
      <p className="absolute left-_1001 top-_1127 text-sm text-center text-blue-600">-</p>
      <p className="absolute left-_1001 top-_1161 text-sm text-center text-blue-600">-</p>
      <p className="absolute left-_981 top-_1195 text-sm text-center text-blue-600">
        Balcon
      </p>
      <p className="absolute left-_991 top-_1060 text-xs font-bold text-left text-[#4f80ff]">
        Les+
      </p>
    </div>
    <svg
      width={1}
      height={153}
      viewBox="0 0 1 153"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-[623.5px] top-[1059.5px]"
      preserveAspectRatio="xMidYMid meet"
    >
      <line x1="0.5" y1="2.18557e-8" x2="0.499993" y2={153} stroke="#EFF4FF" />
    </svg>
    <svg
      width={1}
      height={153}
      viewBox="0 0 1 153"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-[713.5px] top-[1059.5px]"
      preserveAspectRatio="xMidYMid meet"
    >
      <line x1="0.5" y1="2.18557e-8" x2="0.499993" y2={153} stroke="#EFF4FF" />
    </svg>
    <svg
      width={1}
      height={153}
      viewBox="0 0 1 153"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-[775.5px] top-[1059.5px]"
      preserveAspectRatio="xMidYMid meet"
    >
      <line x1="0.5" y1="2.18557e-8" x2="0.499993" y2={153} stroke="#EFF4FF" />
    </svg>
    <svg
      width={1}
      height={153}
      viewBox="0 0 1 153"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-[872.5px] top-[1059.5px]"
      preserveAspectRatio="xMidYMid meet"
    >
      <line x1="0.5" y1="2.18557e-8" x2="0.499993" y2={153} stroke="#EFF4FF" />
    </svg>
    <svg
      width={1}
      height={153}
      viewBox="0 0 1 153"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-[972.5px] top-[1059.5px]"
      preserveAspectRatio="xMidYMid meet"
    >
      <line x1="0.5" y1="2.18557e-8" x2="0.499993" y2={153} stroke="#EFF4FF" />
    </svg>
    <svg
      width={1}
      height={153}
      viewBox="0 0 1 153"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-[1035.5px] top-[1059.5px]"
      preserveAspectRatio="xMidYMid meet"
    >
      <line x1="0.5" y1="2.18557e-8" x2="0.499993" y2={153} stroke="#EFF4FF" />
    </svg>
  </div>
</div>;


*/}




 
 {/*
 
<div className=''>
 <p className="text-[48px] text-left text-blue-500 font-bold text-3xl"
 style={{color:"linear-gradient(180deg, #81A3F9 -0.06%, #3462D8 108.09%)"}}
 >Résidence Bienvivre</p>
 
 <p className="text-sm font-medium text-left text-gray-600">Buzenval - 92500 Rueil-Malmaison</p>
 
 <div className='m-2 border-4 border-r-0 border-t-0 border-b-0 border-blue-400 mt-9'>
 <p className="text-lg font-medium text-left text-[#0e215c] mx-4">du 3 à 4 pièces</p>
 <p className="text-lg font-medium text-left text-[#0e215c] mx-4">de 61 m² à 75 m²</p>
 <p className="w-[200px] h-[23px] text-lg font-medium text-left text-blue-500 mx-4">
   à partir de 271 000€
 </p>
 <p className="w-[200px] h-[23px] text-lg font-medium text-left text-blue-500 mx-4">
   soit 700€ / mois
 </p>
 </div>
 
 <div
   className="flex justify-center items-center w-[343px] relative gap-2.5 px-[120px] py-4 rounded-xl"
   style={{ background: "linear-gradient(to bottom, #81a3f9 -0.06%, #3462d8 108.09%)" }}
 >
   <p className="flex-grow-0 flex-shrink-0 text-sm font-bold text-left text-white">
     Être rappelé selon mes dispos
   </p>
 
 </div>
 <p className="w-[191px] h-2.5 text-sm font-medium text-[#6976a0] text-center text-gray-500 mt-2">
   ou appeler le 06 65 07 11 66
 </p>
 
 <div className="flex flex-col justify-start items-start  gap-2 p-6 rounded-xl bg-white border border-blue-200 mt-9 mb-5">
   <p className="flex-grow-0 flex-shrink-0 w-[295px] font-medium text-left text-[#3679ff] text-blue-600 text-2xl">
     À propos de cette résidence
   </p>
   <p className="self-stretch flex-grow-0 flex-shrink-0 w-[295px] text-sm font-normal text-left text-[#6976a0] text-gray-500">
     Démarrage travaux imminent ! Votre appartement à partir de 205 000 euros. Dans un équilibre
     parfait entre “Vivre au vert et vivre ensemble “, découvrez notre programme GAIA
   </p>
 </div>
 <div className="flex flex-col justify-start items-start relative gap-2 p-6 rounded-xl bg-white border border-blue-200">
   <p className="flex-grow-0 flex-shrink-0 w-[295px] text-lg font-bold text-left text-indigo-900">
     La Banque Postale peut sûrement financer ton projet !
   </p>
   <p className="self-stretch flex-grow-0 flex-shrink-0 w-[295px] text-sm font-medium text-left text-[#6976A0] text-gray-500">
     Kit le nid et La Banque Postale s’unissent pour t’aider à voler de tes propres ailes.
   </p>
   <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-2.5 px-10 py-3 rounded-xl border border-[#3679ff]">
     <p className="flex-grow-0 flex-shrink-0 text-sm font-bold text-left text-[#3679ff]">
       Découvrir
     </p>
   </div>
 </div>
 <div className="flex flex-col justify-center items-center relative gap-2 p-6 rounded-xl bg-white border border-blue-200 mt-4 mb-4">
   <p className="flex-grow-0 flex-shrink-0 w-[295px] text-2xl font-medium text-center text-blue-600">
     Transports à proximités
   </p>
   <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-3">
     <div className="flex-grow-0 flex-shrink-0 w-6 h-6 relative">
       <img src="image-95.png" className="w-6 h-6 absolute left-[-1px] top-[-1px] object-cover" />
     </div>
     <div className="flex-grow-0 flex-shrink-0 w-6 h-6 relative">
       <img src="image-93.png" className="w-6 h-6 absolute left-[-1px] top-[-1px] object-cover" />
     </div>
     <div className="flex-grow-0 flex-shrink-0 w-6 h-6 relative">
       <img src="image-92.png" className="w-6 h-6 absolute left-[-1px] top-[-1px] object-cover" />
     </div>
     <div className="flex-grow-0 flex-shrink-0 w-6 h-6 relative">
       <img src="image-94.png" className="w-6 h-6 absolute left-[-1px] top-[-1px] object-cover" />
     </div>
   </div>
 </div>
 <div className="flex justify-end items-center w-[343px] relative gap-3 p-4 rounded-xl bg-white border border-[#3679ff] mb-4">
   <p className="flex-grow w-[275px] text-sm font-bold text-left text-blue-500">
     2 pièces (3 logements disponibles)
   </p>
   <svg
     width={24}
     height={24}
     viewBox="0 0 24 24"
     fill="none"
     xmlns="http://www.w3.org/2000/svg"
     className="flex-grow-0 flex-shrink-0 w-6 h-6 relative"
     preserveAspectRatio="none"
   >
     <path
       d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
       stroke="#3679FF"
       stroke-width={2}
       stroke-miterlimit={10}
       stroke-linecap="round"
       stroke-linejoin="round"
     />
     <path
       d="M8 12H16"
       stroke="#3679FF"
       stroke-width={2}
       stroke-linecap="round"
       stroke-linejoin="round"
     />
     <path
       d="M12 16L12 8"
       stroke="#3679FF"
       stroke-width={2}
       stroke-linecap="round"
       stroke-linejoin="round"
     />
   </svg>
 </div>
 <div
   className="flex flex-col justify-start items-start relative gap-2 p-6 rounded-xl mb-4 py-"
   style={{ background: "linear-gradient(219.21deg, #c399db -0.85%, #5882f7 106.68%)" }}
 >
   <svg
     width={12}
     height={20}
     viewBox="0 0 12 20"
     fill="none"
     xmlns="http://www.w3.org/2000/svg"
     className="flex-grow-0 flex-shrink-0 w-3 h-5 relative"
     preserveAspectRatio="none"
   >
     <path
       fill-rule="evenodd"
       clip-rule="evenodd"
       d="M8.30933 13.2255L8.30672 13.2299C7.9347 13.864 7.81395 14.3314 7.81395 14.659C7.81395 15.0235 7.91119 15.3112 8.09532 15.5637C8.35747 15.9055 8.61345 16.1273 8.85311 16.2662C9.2786 16.5015 9.67042 16.7317 10.0274 16.9571C10.2306 17.0775 10.4454 17.2241 10.6245 17.4022C10.7801 17.5568 11.093 17.9159 11.093 18.4509C11.093 18.9671 10.8425 19.4492 10.3709 19.7339C9.99305 19.9619 9.5759 20 9.27907 20C8.14884 20 7.06772 19.391 6.0768 18.5393L6.07307 18.5361L6.06938 18.5329C5.63861 18.1563 5.27477 17.7451 4.99272 17.3005C4.40913 18.029 3.97055 18.556 3.68243 18.8728C3.4477 19.139 3.21223 19.3787 2.9822 19.5617C2.86566 19.6544 2.72569 19.7526 2.56653 19.8317C2.41577 19.9067 2.17747 20 1.88372 20C1.10385 20 0.625845 19.4682 0.386049 19.0867L0.363945 19.0515L0.344433 19.0149C0.133984 18.6197 0 18.1807 0 17.711C0 17.5215 0.0389596 17.3098 0.0688206 17.1605C0.104856 16.9802 0.156173 16.7588 0.220252 16.502C0.348744 15.987 0.538657 15.2894 0.787816 14.4146C1.27369 12.6935 1.76322 10.6195 2.25542 8.18809C2.74016 5.79344 2.97674 3.65967 2.97674 1.78035C2.97674 1.61642 2.98644 1.43563 3.02054 1.25767C3.04885 1.10986 3.11288 0.857371 3.29024 0.61714C3.68253 0.0679559 4.29786 0 4.60465 0C5.07895 0 5.43947 0.221439 5.66945 0.431036C5.88445 0.626979 6.04539 0.863692 6.16846 1.08381C6.46932 1.57753 6.62791 2.12462 6.62791 2.7052C6.62791 4.91233 6.24412 7.59665 5.49476 10.7446C6.41344 9.55732 7.22252 8.59259 7.9207 7.85507L7.9235 7.85211L7.92633 7.84916C8.26465 7.49678 8.57072 7.20248 8.83526 6.98817C8.96627 6.88204 9.11339 6.7739 9.26881 6.68673C9.39168 6.61782 9.66892 6.47399 10.0233 6.47399C10.6186 6.47399 11.0901 6.75658 11.4206 7.10709C11.6608 7.34987 12 7.77969 12 8.36994C12 8.6902 11.8756 8.93682 11.8246 9.0328C11.7569 9.16029 11.6756 9.27671 11.6016 9.37392C11.4519 9.57065 11.2521 9.79204 11.0226 10.0284C10.5875 10.4764 10.106 10.9706 9.57823 11.5107C9.12882 11.9707 8.70492 12.5372 8.31191 13.221L8.30933 13.2255ZM9.346 17.6843C9.346 17.6843 9.34302 17.685 9.33625 17.6857C9.34248 17.6845 9.346 17.6843 9.346 17.6843Z"
       fill="white"
     />
   </svg>
   <p className="flex-grow-0 flex-shrink-0 w-[295px] text-lg font-bold text-left text-white">
     Le mot de Kit le nid.
   </p>
   <p className="flex-grow-0 flex-shrink-0 w-[295px] text-sm font-medium text-left text-white">
     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lobortis felis eu posuere
     semper. Proin egestas eros at odio porttitor efficitur. Quisque id enim orci.
   </p>
 </div>
 <div className="flex justify-end items-center w-[343px] relative gap-3 p-4 rounded-xl bg-white border border-[#3679ff]">
   <p className="flex-grow w-[275px] text-sm font-bold text-left text-blue-500">
     3 pièces (28 logements disponibles)
   </p>
   <svg
     width={24}
     height={24}
     viewBox="0 0 24 24"
     fill="none"
     xmlns="http://www.w3.org/2000/svg"
     className="flex-grow-0 flex-shrink-0 w-6 h-6 relative"
     preserveAspectRatio="none"
   >
     <path
       d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
       stroke="#3679FF"
       stroke-width={2}
       stroke-miterlimit={10}
       stroke-linecap="round"
       stroke-linejoin="round"
     />
     <path
       d="M8 12H16"
       stroke="#3679FF"
       stroke-width={2}
       stroke-linecap="round"
       stroke-linejoin="round"
     />
     <path
       d="M12 16L12 8"
       stroke="#3679FF"
       stroke-width={2}
       stroke-linecap="round"
       stroke-linejoin="round"
     />
   </svg>
 </div>
</div>
 
 
 */}
 
 
 
   {/*
   <div className="relative p-4">
     <div>
       <img src='./static/img/logo.png'/>
     </div>
       <div class='flex items-center border-2 rounded-xl py-2 shadow-sm bg-white'>
         <input type='text' placeholder='localisation'
         className='pl-5 bg-transparent outline-none flex-grow'/>
         <svg
               width="23"
               height="23"
               viewBox="0 0 23 23"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
               class="bg-gradient-to-r from-blue-700 to-blue-300 rounded-md w-8 h-8 p-1 cursor-pointer inline-flex mx-2"
               preserveAspectRatio="xMidYMid meet">
                 <path
                   d="M9.58333 16.2917C13.2882 16.2917 16.2917 13.2882 16.2917 9.58333C16.2917 5.87842 13.2882 2.875 9.58333 2.875C5.87842 2.875 2.875 5.87842 2.875 9.58333C2.875 13.2882 5.87842 16.2917 9.58333 16.2917Z"
                   stroke="white"
                   stroke-width="2"
                   stroke-linecap="round"
                   stroke-linejoin="round"
                 ></path>
                 <path
                   d="M14.375 14.375L20.125 20.125"
                   stroke="white"
                   stroke-width="2"
                   stroke-linecap="round"
                   stroke-linejoin="round"
                 ></path>
           </svg>
       </div>
 
     <div className='flex mt-3 space-x-1'>
       <button className="bg-white border-2 border-gray-200 rounded-xl w-40 mx-4 h-9">
         Prix
       </button>
       <button className="bg-white border-2 rounded-xl w-40 border-gray-200">
         Nb de pièce     
       </button>
    </div>
   </div> */}
     </>
 
 );
};
 

