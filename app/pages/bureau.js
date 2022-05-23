import React from 'react'
import Header from 'components/Header/Header'
import Footer from 'components/Footer/Footer'
import {Icon} from 'components';

export default function Bureau() {
  const [user, setUser] = React.useState();

    return (

        <>


{window.innerWidth <1024?(
  <div>
  <div 
  className=' px-40 md:px-80'
  >
<Icon
                type="LogoVV"
                
                
              /></div>
  <div className='my-8 mx-4'>
  

  <p className="w-_341 text-xl font-light text-_titre">
  Etudiants, Jeunes Actifs. 
  </p>
  <p className=' font-semibold text-_titre text-2xl'>
  La première Offre Jeune pour devenir propriétaire {window.innerWidth}
  </p>
  
  <p className=" w-_312 text-base text-center text-indigo-300">
    Réalisez votre premier achat immobilier pour seulement 700€ par moisdd!*
  </p></div>

  <div className='flex flex-col mx-4 '>
    <div class='flex items-center border-2 rounded-3xl py-2 shadow-sm bg-white absolute w-96'>
          <input type='text' placeholder='Recherche'
          className='pl-5 bg-transparent outline-none flex-grow'/>
          <svg
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class=" w-8 h-8 p-2 cursor-pointer inline-flex mx-2"
                style={{background:"linear-gradient(180deg, #81A3F9 -0.06%, #3462D8 108.09%)", borderRadius:"42px"}}
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
    <div className=' my-10  '>
      <img src="static/img/icons/House1.svg" className="w-_344 h-_175 rounded-xl object-cover " />
    </div>
</div>
<div className='flex flex-row-reverse items-start mx-8 mb-4'
>
  <div className=' mx-4 '>
  <p className="text-_bleuMarine font-_spaceGrotesk text-xl font-bold">
      Des logements dans toute la France  la taille est de :{window.innerWidth}
  </p>
  <p className=" text-_grisBleu font-_spaceGrotesk mt-1">
  Accéder à notre carte avec plus de 2 500 logements neufs disponibles.  </p>
  </div>
 <div>
  <svg
    width={53}
    height={53}
    viewBox="0 0 53 53"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-_53 h-_53 relative"
    preserveAspectRatio="none"
  >
    <circle cx="26.5" cy="26.5" r="26.5" fill="#DCE6FF" />
    <path
      d="M33.6585 24.7013L26.6585 18.5763C26.2815 18.2464 25.7185 18.2464 25.3415 18.5763L18.3415 24.7013C18.1245 24.8912 18 25.1655 18 25.4539V34.0001C18 34.5524 18.4477 35.0001 19 35.0001H23C23.5523 35.0001 24 34.5524 24 34.0001V30.0001C24 29.4478 24.4477 29.0001 25 29.0001H27C27.5523 29.0001 28 29.4478 28 30.0001V34.0001C28 34.5524 28.4477 35.0001 29 35.0001H33C33.5523 35.0001 34 34.5524 34 34.0001V25.4539C34 25.1655 33.8755 24.8912 33.6585 24.7013Z"
      stroke="#6A7CA8"
      stroke-width={2}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg></div>

  </div>

  <div className='flex flex-row-reverse items-start mx-8 mb-4'>
  <div className='mx-4'>
  <p className=" text-_bleuMarine font-_spaceGrotesk text-xl font-bold">Accès libre aux</p>
  <p className=" text-_grisBleu font-_spaceGrotesk  mt-1">
  Télécharger gratuitement les plans des appartements et les plaquettes de présentation de nos résidences.  </p></div>
  <div>
  <svg
    width={53}
    height={53}
    viewBox="0 0 53 53"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-_53 h-_53 relative"
    preserveAspectRatio="none"
  >
    <circle cx="26.5" cy="26.5" r="26.5" fill="#FEF2D5" />
    <path
      d="M30 18H22C21.4477 18 21 18.4477 21 19V35C21 35.5523 21.4477 36 22 36H30C30.5523 36 31 35.5523 31 35V19C31 18.4477 30.5523 18 30 18Z"
      stroke="#DCC07E"
      stroke-width={2}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M26 33H26.002V33.002H26V33Z"
      stroke="#DCC07E"
      stroke-width={2}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg></div>
</div>

<div className='flex flex-row-reverse items-start mx-8 mb-4'>
  <div className='mx-4'>
  <p className=" text-_bleuMarine font-_spaceGrotesk text-xl font-bold">Un unique conseiller dédié</p>
  <p className=" text-_grisBleu font-_spaceGrotesk  mt-1">
  Une même personne pour vous accompagner, de la recherche de votre appartement jusqu’à votre emménagement. 
  </p></div>
  <div>
  <svg
    width={53}
    height={53}
    viewBox="0 0 53 53"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-[53px] h-[53px] relative"
    preserveAspectRatio="none"
  >
    <circle cx="26.5" cy="26.5" r="26.5" fill="#F5EAF9" />
    <path
      d="M21 35C21 33.3431 23.2386 32 26 32C28.7614 32 31 33.3431 31 35"
      stroke="#B985CC"
      stroke-width={2}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M32 29.2495C33.7659 29.7124 35 30.7697 35 31.9999"
      stroke="#B985CC"
      stroke-width={2}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M20 29.2495C18.2341 29.7124 17 30.7697 17 31.9999"
      stroke="#B985CC"
      stroke-width={2}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M26 29C27.6569 29 29 27.6569 29 26C29 24.3431 27.6569 23 26 23C24.3431 23 23 24.3431 23 26C23 27.6569 24.3431 29 26 29Z"
      stroke="#B985CC"
      stroke-width={2}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M32 25.2361C32.6137 24.6868 33 23.8885 33 23C33 21.3431 31.6569 20 30 20C29.2316 20 28.5308 20.2889 28 20.7639"
      stroke="#B985CC"
      stroke-width={2}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M20 25.2361C19.3863 24.6868 19 23.8885 19 23C19 21.3431 20.3431 20 22 20C22.7684 20 23.4692 20.2889 24 20.7639"
      stroke="#B985CC"
      stroke-width={2}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg></div>
  </div>


  <div className='flex flex-row-reverse items-start mx-8 mb-12'>
    <div className='mx-4'>
  <p className=" text-_bleuMarine font-_spaceGrotesk text-xl font-bold">Des aides pour votre premier achat </p>
  <p className="text-_grisBleu font-_spaceGrotesk mt-1">
  Prêt à Taux Zéro - TVA 5,5 %
Des remises(2) sur 100% des logements Nexity.  </p></div>
  <div>
  <svg
    width={53}
    height={53}
    viewBox="0 0 53 53"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className=" w-_53 h-_53 relative"
    preserveAspectRatio="none"
  >
    <circle cx="26.5" cy="26.5" r="26.5" fill="#EDF8F0" />
    <path
      d="M29 21L35 18V33L29 36V21Z"
      stroke="#93C8A2"
      stroke-width={2}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M23 33L29 36V21L23 18V33Z"
      stroke="#93C8A2"
      stroke-width={2}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M17 21L23 18V33L17 36V21Z"
      stroke="#93C8A2"
      stroke-width={2}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg></div>
</div>

<p class=" text-2xl font-semibold text-_bleuMarine mx-8">Nos services partenaires pour les étudiants</p>
<div class="text-md text-_grisBleu p-3 mx-4">Kit le nid vous propose un ensemble d’offres avantageuses pour mieux répondre à vos besoins lors de vos études :
<ul>
  <li>
  une location en résidence étudiante
  </li>
  <li>
  une mutuelle santé 
  </li>
  <li>
  un garant solide pour vous
  </li>
</ul>
 </div>

<div class="relative" style={{height: "487.03px"}}>
    <div class="w-40 h-40 absolute bg-indigo-50  rounded-xl" style={{left: "110.90px", top: "260.36px"}}/>
    <div class="w-40 h-40 absolute bg-indigo-50  rounded-xl" style={{left: "200.66px", top: "48.79px"}}/>
    <div class="w-20 h-20 absolute bg-green-50  rounded-xl" style={{left: "382.59px", top: "311.62px"}}/>
    <div class="w-20 h-20 absolute bg-yellow-100  rounded-xl" style={{left: "370.76px" ,top: "0px"}}/>
    <div class="w-20 h-20 absolute bg-purple-100  rounded-xl border-purple-100 border-opacity-10" style={{left: "0px", top: "201.83px"}}/>
    <div class="w-40 h-40 absolute" style={{left: "180.76px" ,top: "320.68px"}}>
        <div class="flex items-center justify-center flex-1 h-full px-4 py-14 bg-white rounded-xl">
            <div class="inline-flex flex-col space-y-2 items-center justify-end flex-1 h-full">
                <img class="w-28 h-4" src="https://via.placeholder.com/104.2425308227539x17.743410110473633"/>
                <div class="w-full h-8">
                    <div class="flex items-center justify-center flex-1 h-full pl-3 pr-3.5 pt-1.5 pb-1 bg-indigo-600 bg-opacity-10 rounded-lg">
                        <p class="flex-1 h-full text-sm font-bold text-center text-indigo-600">3 mois offerts</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="w-40 h-40 absolute" style={{left: "130.59px", top: "90.90px"}}>
        <div class="flex items-center justify-center flex-1 h-full px-5 py-10 bg-white rounded-xl">
            <div class="inline-flex flex-col space-y-0.5 items-center justify-end flex-1 h-full">
                <img class="w-full h-1/2" src="https://via.placeholder.com/123.89794158935547x41.50580596923828"/>
                <div class="w-3/4 h-10">
                    <div class="flex items-center justify-center flex-1 h-full px-5 py-1.5 bg-red-500 bg-opacity-10 rounded-xl">
                        <p class="flex-1 h-full text-base font-bold text-center text-red-500">-15%</p>
                    </div> 
                </div>
            </div>
        </div>
    </div>
</div>




<div className="flex flex-col justify-start items-start relative gap-2 p-6 rounded-xl bg-white border border-_bordureBleu mt-5 mb-5 mx-4">
    <p className="flex-grow-0 flex-shrink-0 w-72 text-lg font-bold text-left text-_titre">
      Découverz notre guide du premier achat.
    </p>
    <p className="self-stretch flex-grow-0 flex-shrink-0 w-72 text-sm font-medium text-left text-_grisBleu">
      Kit le nid et La Banque Postale s’unissent pour t’aider à voler de tes propres ailes.
    </p>
    <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-2.5 px-10 py-3 rounded-xl border border-_aPropos">
      <a className="flex-grow-0 flex-shrink-0 text-sm font-bold text-left text-_aPropos cursor-pointer" href="assets/files/Guideachat.pdf">
        Télécharger notre guide
      </a>
      
    </div>
   
  </div>



  
<div className=' text-_grisBleu font-thin text-sm mt-32'>
(1) Mensualités données à titre indicatif uniquement et non contractuelles, pour l’achat d’un appartement de 187.000 €, sur une base de durée de 25 ans, à un taux d’intérêt fixe moyen constaté sur le marché de 1.4%, hors frais, hors assurance et avec un apport personnel de 7.500€. 
Pour être éligible au PTZ : il doit s’agir de votre premier achat en résidence principale et votre revenu fiscal de référence sur l’année 2 ans avant la réservation de l’appartement doit être inférieur à 37 000 €
</div>


</div>


):


//Seconde condition

(
  <div className=' bg-yellow-700 w-screen '>
  
  

    <div className='flex flex-row justify-between'>
          <div className='my-8 mx-4 top'>
              <p className="w-_341 text-xl font-light text-_titre">
              Etudiants, Jeunes Actifs. 
              </p>
              <p className=' font-semibold text-_titre text-2xl'>
              La première Offre Jeune pour devenir propriétaire {window.innerWidth}
              </p>
              <p className=" w-_312 text-base text-center text-indigo-300">
                Réalisez votre premier achat immobilier pour seulement 700€ par moisdd!*
              </p>
          </div>
              <div className='justify-end flex'>
                <img src="static/img/icons/House1.svg" className=" object-cover w-_515 h-_460 mx-2" />
              </div>
      </div>

    <div className=' flex flex-row mb-32 bg-blue-800 justify-between'>
      <div className='flex flex-row-reverse items-start mx-4 w-_388 h-_198'>
              <div className='  '>
              <p className="text-_bleuMarine font-_spaceGrotesk text-xl font-bold">
                  Des logements dans toute la France
              </p>
              <p className=" text-_grisBleu font-_spaceGrotesk bg-white ">
              Accéder à notre carte avec plus de 2 500 logements neufs disponibles.  </p>
              </div>
            <div className=''>
              <svg
                width={53}
                height={53}
                viewBox="0 0 53 53"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-_53 h-_53 relative"
                preserveAspectRatio="none"
              >
                <circle cx="26.5" cy="26.5" r="26.5" fill="#DCE6FF" />
                <path
                  d="M33.6585 24.7013L26.6585 18.5763C26.2815 18.2464 25.7185 18.2464 25.3415 18.5763L18.3415 24.7013C18.1245 24.8912 18 25.1655 18 25.4539V34.0001C18 34.5524 18.4477 35.0001 19 35.0001H23C23.5523 35.0001 24 34.5524 24 34.0001V30.0001C24 29.4478 24.4477 29.0001 25 29.0001H27C27.5523 29.0001 28 29.4478 28 30.0001V34.0001C28 34.5524 28.4477 35.0001 29 35.0001H33C33.5523 35.0001 34 34.5524 34 34.0001V25.4539C34 25.1655 33.8755 24.8912 33.6585 24.7013Z"
                  stroke="#6A7CA8"
                  stroke-width={2}
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg></div>

      </div>

      <div className='flex flex-row-reverse items-start mx-4  lg:w-_388 lg:h-_198'>
      <div className='mx-4'>
      <p className=" text-_bleuMarine font-_spaceGrotesk text-xl font-bold">Accès libre aux plans</p>
      <p className=" text-_grisBleu font-_spaceGrotesk  mt-1">
      Télécharger gratuitement les plans des appartements et les plaquettes de présentation de nos résidences.  </p></div>
      <div>
      <svg
        width={53}
        height={53}
        viewBox="0 0 53 53"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-_53 h-_53 relative"
        preserveAspectRatio="none"
      >
        <circle cx="26.5" cy="26.5" r="26.5" fill="#FEF2D5" />
        <path
          d="M30 18H22C21.4477 18 21 18.4477 21 19V35C21 35.5523 21.4477 36 22 36H30C30.5523 36 31 35.5523 31 35V19C31 18.4477 30.5523 18 30 18Z"
          stroke="#DCC07E"
          stroke-width={2}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M26 33H26.002V33.002H26V33Z"
          stroke="#DCC07E"
          stroke-width={2}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg></div>
    </div>

    <div className='flex flex-row-reverse items-start mx-4 mb-4 lg:w-_388 lg:h-_198'>
      <div className='mx-4'>
      <p className=" text-_bleuMarine font-_spaceGrotesk text-xl font-bold">Un unique conseiller dédié</p>
      <p className=" text-_grisBleu font-_spaceGrotesk  mt-1">
      Une même personne pour vous accompagner, de la recherche de votre appartement jusqu’à votre emménagement. 
      </p></div>
      <div>
      <svg
        width={53}
        height={53}
        viewBox="0 0 53 53"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[53px] h-[53px] relative"
        preserveAspectRatio="none"
      >
        <circle cx="26.5" cy="26.5" r="26.5" fill="#F5EAF9" />
        <path
          d="M21 35C21 33.3431 23.2386 32 26 32C28.7614 32 31 33.3431 31 35"
          stroke="#B985CC"
          stroke-width={2}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M32 29.2495C33.7659 29.7124 35 30.7697 35 31.9999"
          stroke="#B985CC"
          stroke-width={2}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M20 29.2495C18.2341 29.7124 17 30.7697 17 31.9999"
          stroke="#B985CC"
          stroke-width={2}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M26 29C27.6569 29 29 27.6569 29 26C29 24.3431 27.6569 23 26 23C24.3431 23 23 24.3431 23 26C23 27.6569 24.3431 29 26 29Z"
          stroke="#B985CC"
          stroke-width={2}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M32 25.2361C32.6137 24.6868 33 23.8885 33 23C33 21.3431 31.6569 20 30 20C29.2316 20 28.5308 20.2889 28 20.7639"
          stroke="#B985CC"
          stroke-width={2}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M20 25.2361C19.3863 24.6868 19 23.8885 19 23C19 21.3431 20.3431 20 22 20C22.7684 20 23.4692 20.2889 24 20.7639"
          stroke="#B985CC"
          stroke-width={2}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg></div>
      </div>


      <div className='flex flex-row-reverse items-start mx-4 mb-12 lg:w-_388 lg:h-_198'>
        <div className='mx-4'>
      <p className=" text-_bleuMarine font-_spaceGrotesk text-xl font-bold">Des aides pour votre premier achat </p>
      <p className="text-_grisBleu font-_spaceGrotesk mt-1">
      Prêt à Taux Zéro - TVA 5,5 %
    Des remises(2) sur 100% des logements Nexity.  </p></div>
      <div>
      <svg
        width={53}
        height={53}
        viewBox="0 0 53 53"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className=" w-_53 h-_53 relative"
        preserveAspectRatio="none"
      >
        <circle cx="26.5" cy="26.5" r="26.5" fill="#EDF8F0" />
        <path
          d="M29 21L35 18V33L29 36V21Z"
          stroke="#93C8A2"
          stroke-width={2}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M23 33L29 36V21L23 18V33Z"
          stroke="#93C8A2"
          stroke-width={2}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M17 21L23 18V33L17 36V21Z"
          stroke="#93C8A2"
          stroke-width={2}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        </svg></div>
    </div>
</div>

<div className='bg-white flex w-1/2'>
  <div className=' bg-green-700'>
        <p class=" text-2xl font-semibold text-_bleuMarine mx-4">Nos services partenaires pour les étudiants</p>
        <div class="text-md text-_grisBleu p-3 mx-4">Kit le nid vous propose un ensemble d’offres avantageuses pour mieux répondre à vos besoins lors de vos études :
        <ul>
          <li>
          une location en résidence étudiante
          </li>
          <li>
          une mutuelle santé 
          </li>
          <li>
          un garant solide pour vous
          </li>
        </ul>
        </div></div>

        <div className="relative bg-yellow-200" style={{height: "487.03px"}}>
            <div class="w-40 h-40 absolute bg-indigo-50  rounded-xl" style={{left: "110.90px", top: "260.36px"}}/>
            <div class="w-40 h-40 absolute bg-indigo-50  rounded-xl" style={{left: "200.66px", top: "48.79px"}}/>
            <div class="w-20 h-20 absolute bg-green-50  rounded-xl" style={{left: "382.59px", top: "311.62px"}}/>
            <div class="w-20 h-20 absolute bg-yellow-100  rounded-xl" style={{left: "370.76px" ,top: "0px"}}/>
            <div class="w-20 h-20 absolute bg-purple-100  rounded-xl border-purple-100 border-opacity-10" style={{left: "0px", top: "201.83px"}}/>
            <div class="w-40 h-40 absolute" style={{left: "180.76px" ,top: "320.68px"}}>
                <div class="flex items-center justify-center flex-1 h-full px-4 py-14 bg-white rounded-xl">
                    <div class="inline-flex flex-col space-y-2 items-center justify-end flex-1 h-full">
                        <img class="w-28 h-4" src="static/img/LogoCautioneo.svg"/>
                        <div class="w-full h-8">
                            <div class="flex items-center justify-center flex-1 h-full pl-3 pr-3.5 pt-1.5 pb-1 bg-indigo-600 bg-opacity-10 rounded-lg">
                                <p class="flex-1 h-full text-sm font-bold text-center text-indigo-600">3 mois offerts</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-40 h-40 absolute" style={{left: "130.59px", top: "90.90px"}}>
                <div class="flex items-center justify-center flex-1 h-full px-5 py-10 bg-white rounded-xl">
                    <div class="inline-flex flex-col space-y-0.5 items-center justify-end flex-1 h-full">
                        <img class="w-full h-1/2" src="static/img/LogoHeyme.svg"/>
                        <div class="w-3/4 h-10">
                            <div class="flex items-center justify-center flex-1 h-full px-5 py-1.5 bg-red-500 bg-opacity-10 rounded-xl">
                                <p class="flex-1 h-full text-base font-bold text-center text-red-500">-15%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   </div>



<div className="flex flex-row justify-between items-start relative gap-2 p-16 rounded-xl bg-white border border-_bordureBleu mt-5 mb-5 mx-28">
    
    <div>
      <p className="flex-grow-0 flex-shrink-0 w-72 text-lg font-bold text-left text-_titre">
          Découverz notre guide du premier achat.
        </p>
        <p className="self-stretch flex-grow-0 flex-shrink-0 w-72 text-sm font-medium text-left text-_grisBleu">
          Kit le nid et La Banque Postale s’unissent pour t’aider à voler de tes propres ailes.
        </p>
        <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-2.5 px-10 py-3 rounded-xl border border-_aPropos mt-6">
      <p className="flex-grow-0 flex-shrink-0 text-sm font-bold text-left text-_aPropos">
        Télécharger notre guide
      </p>
    </div>
      </div>
    

    <div>
      <img src='static/img/GuideA.svg'/>
    </div>
   
  </div>



  
<div className=' text-_grisBleu font-thin text-sm mt-10 -mb-10'>
(1) Mensualités données à titre indicatif uniquement et non contractuelles, pour l’achat d’un appartement de 187.000 €, sur une base de durée de 25 ans, à un taux d’intérêt fixe moyen constaté sur le marché de 1.4%, hors frais, hors assurance et avec un apport personnel de 7.500€. 
Pour être éligible au PTZ : il doit s’agir de votre premier achat en résidence principale et votre revenu fiscal de référence sur l’année 2 ans avant la réservation de l’appartement doit être inférieur à 37 000 €
</div>


</div>

)}
 
      </>
 
 );
};
 


       

  
