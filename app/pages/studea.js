import React from 'react'
import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

export default function studea() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('xs'));
    const isMdView = useMediaQuery(theme.breakpoints.down('sm'));
      return (
        <>
  
        {isMdView ?(
          <>
          <div className='  lg:w-screen lg:-mx-52'>
          <div className='flex flex-col mx-4 lg:flex lg:flex-col lg:order-first lg:justify-between lg:items-end'>
          
                    <div className='lg:order-last -mx-4 mb-10 my-12 '>
                      <img src="static/img/icons/House1.svg" className=" w-_388 h-_175 rounded-xl object-cover lg:w-_515 lg:h-_460 mx-2" />
                    </div>
            </div>
          <div className=' lg:flex lg:flex-row lg:mb-32 '>
            <div className='flex flex-row-reverse items-start mx-4 mb-4 lg:w-_388 lg:h-_198'>
              <div className=' mx-4 '>
              <p className="text-_bleuMarine font-_spaceGrotesk text-xl font-bold">
                  Des logements dans toute la France
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
            <div className='flex flex-row-reverse items-start mx-4 mb-4 lg:w-_388 lg:h-_198'>
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
       
       
       
       <div className="flex flex-col justify-start items-start relative gap-2 p-6 rounded-xl bg-white border border-_bordureBleu mt-5 mb-5 mx-4">
          <p className="flex-grow-0 flex-shrink-0 w-72 text-lg font-bold text-left text-_titre">
            Découverz notre guide du premier achat.
          </p>
          <p className="self-stretch flex-grow-0 flex-shrink-0 w-72 text-sm font-medium text-left text-_grisBleu">
          N’attendez pas d’avoir 30 ans pour devenir propriétaire ! Découvrez comment avec notre guide gratuit.          </p>
          <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-2.5 px-10 py-3 rounded-xl border border-_aPropos">
            <p className="flex-grow-0 flex-shrink-0 text-sm font-bold text-left text-_aPropos">
              Télécharger notre guide
            </p>
          </div>
        </div>
       <div className=' text-_grisBleu font-thin text-sm mt-16 -mb-10'>
            (1) Mensualité donnée à titre indicatif uniquement et non contractuelle, pour l’achat d’un appartement de respectivement 187.000 € (avec une remise de 4 200 €) et de 235 000 (avec une remise de 4 950 €), sur une base de durée de 25 ans, à un taux d’intérêt fixe moyen constaté sur le marché de 1.4%, hors frais, hors assurance et avec un apport personnel de 7.500€. Le résultat ne tient pas compte des différentes options fiscales éligibles.
        Pour être éligible au PTZ : il doit s’agir de votre premier achat en résidence principale et votre revenu fiscal de référence sur l’année 2 ans avant la réservation de l’appartement doit être inférieur à 37 000 € pour une personne seul et 51 800 € pour deux
        <br/>
        <br/>
        (2) Offre ouverte à tous les locataires et anciens locataires de Nexity Studéa, et ce jusqu’à 12 mois après la date d’échéance de leur bail, dans la limite d’une seule fois par bien acquis. Cette offre se traduira par une réduction correspondant à une somme, estimée, équivalente aux frais d’actes d’acquisition ou à la moitié de ces derniers (hors frais de financement et de garanties, notamment frais d’hypothèques, frais de cautionnement Crédit Logement, hors frais de règlement de copropriété ou cahier des charges, et hors frais de traduction) devant être versés par le réservataire au jour de la signature de l’acte authentique de vente. Réduction de prix soumise à la signature d’un acte authentique de vente, dans les délais stipulés au contrat de réservation. Cette somme, estimée à l’aide du barème rapide des notaires, est définitivement et forfaitairement arrêtée le jour de la signature du contrat de réservation.

        </div>
       </div>
       
       
       </>
      
        
      
        ):
      
      
        (
          <>  
       
       {/* s*/}
       <div className="w-[1480px] h-[1703px] relative overflow-hidden bg-[#f9fbff]">
  <div className="w-[344px] h-[46px]">
    <div className="w-[163.32px] h-[46px]">
      <div className="w-[163.32px] h-[46px] absolute left-[1135px] top-[-408px] rounded-[55px] bg-white border-2 border-[#4f80ff]" />
      <p className="w-[115.69px] h-[23.7px] absolute left-[1159.48px] top-[-395.5px] text-base font-bold text-center text-[#4f80ff]">
        Se connecter
      </p>
    </div>
    <div className="w-[162.3px] h-[46px]">
      <div
        className="w-[162.3px] h-[46px] absolute left-[1317.2px] top-[-407.5px] rounded-[55px] bg-[#4f80ff]"
        style={{ boxShadow: "0px 10px 44px -5px rgba(14,108,218,0.35)" }}
      />
      <p className="w-[74.52px] h-[23px] absolute left-[1361.59px] top-[-395.5px] text-base font-bold text-center text-white">
        S’inscrire
      </p>
    </div>
  </div>
  <img
    src="static/img/icons/House1.svg"
    className="w-[515px] h-[460px] absolute left-[852.42px] top-[145.42px] rounded-[20px] object-cover"
  />
  <p className="w-[426px] absolute left-[114px] top-[330px] text-xl text-left text-[#849cd9]">
    <span className="w-[426px] text-xl text-left text-[#849cd9]">Réalisez votre </span>
    <span className="w-[426px] text-xl font-bold text-left text-[#849cd9]">
      premier achat immobilier
    </span>
    <span className="w-[426px] text-xl text-left text-[#849cd9]"> pour seulement </span>
    <span className="w-[426px] text-xl font-bold text-left text-[#849cd9]">685 €/mois !(1)</span>
  </p>
  <div className="w-[936px] h-[97px] absolute left-[112.5px] top-[408.5px] rounded-[20px] bg-white" />
  <div className="w-[1251px] h-[298px] absolute left-[115.5px] top-[949.5px] rounded-[20px] bg-white" />
  <div className="flex justify-center items-center w-[213px] h-14 absolute left-[178px] top-[1130px] gap-2.5 px-[103px] py-[9px] rounded-xl bg-white border border-[#3679ff]">
    <p className="flex-grow-0 flex-shrink-0 text-sm font-bold text-left text-[#3679ff]">
      Télécharger notre guide
    </p>
  </div>
  <div className="w-[150px] h-12">
    <p className="absolute left-[158px] top-[461px] text-base font-semibold text-left text-[#8c97b6]">
      Où cherchez-vous ?
    </p>
    <p className="absolute left-[158px] top-[435px] text-base font-bold text-left text-[#4f80ff]">
      Localisation
    </p>
  </div>
  <div className="w-[278px] h-12">
    <p className="absolute left-[371px] top-[461px] text-base font-semibold text-left text-[#8c97b6]">
      Combien de pièces souhaitez-vous ?
    </p>
    <p className="absolute left-[371px] top-[435px] text-base font-bold text-left text-[#4f80ff]">
      Nombre de pièces{" "}
    </p>
  </div>
  <div className="w-[179px] h-12">
    <p className="absolute left-[741px] top-[461px] text-base font-semibold text-left text-[#8c97b6]">
      Quel est votre budget ?
    </p>
    <p className="absolute left-[741px] top-[435px] text-base font-bold text-left text-[#4f80ff]">
      Budget
    </p>
  </div>
  <svg
    width={1}
    height={49}
    viewBox="0 0 1 49"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute left-[338px] top-[433px]"
    preserveAspectRatio="xMidYMid meet"
  >
    <line x1="0.5" y1="2.18557e-8" x2="0.499998" y2={49} stroke="url(#paint0_linear_1215_6375)" />
    <defs>
      <lineargradient
        id="paint0_linear_1215_6375"
        x1="-0.00000107093"
        y1="24.5"
        x2={-1}
        y2="24.5"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#3563DC" />
        <stop offset="0.0434107" stop-color="#3E6FEF" />
        <stop offset="0.940497" stop-color="#3062E3" />
        <stop offset={1} stop-color="#154AD2" />
      </lineargradient>
    </defs>
  </svg>
  <svg
    width={1}
    height={49}
    viewBox="0 0 1 49"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute left-[717px] top-[433px]"
    preserveAspectRatio="xMidYMid meet"
  >
    <line x1="0.5" y1="2.18557e-8" x2="0.499998" y2={49} stroke="url(#paint0_linear_1215_6376)" />
    <defs>
      <lineargradient
        id="paint0_linear_1215_6376"
        x1="-0.00000107093"
        y1="24.5"
        x2={-1}
        y2="24.5"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#3563DC" />
        <stop offset="0.0434107" stop-color="#3E6FEF" />
        <stop offset="0.940497" stop-color="#3062E3" />
        <stop offset={1} stop-color="#154AD2" />
      </lineargradient>
    </defs>
  </svg>
  <div className="w-[300px] h-[198px]">
    <p className="w-[253px] absolute left-[115px] top-[737px] text-xl font-bold text-center text-[#0e215c]">
      Des logements dans toute la France
    </p>
    <p className="w-[300px] absolute left-[92px] top-[797px] text-lg text-center text-[#849cd9]">
      Accéder à notre carte avec plus de 2 500 logements neufs disponibles.
    </p>
    <svg
      width={53}
      height={53}
      viewBox="0 0 53 53"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[53px] h-[53px] absolute left-[214.5px] top-[667.5px]"
      preserveAspectRatio="none"
    >
      <circle cx="26.5" cy="26.5" r="26.5" fill="#DCE6FF" />
      <path
        d="M33.6585 24.701L26.6585 18.576C26.2815 18.2461 25.7185 18.2461 25.3415 18.576L18.3415 24.701C18.1245 24.8909 18 25.1653 18 25.4536V33.9998C18 34.5521 18.4477 34.9998 19 34.9998H23C23.5523 34.9998 24 34.5521 24 33.9998V29.9998C24 29.4476 24.4477 28.9998 25 28.9998H27C27.5523 28.9998 28 29.4476 28 29.9998V33.9998C28 34.5521 28.4477 34.9998 29 34.9998H33C33.5523 34.9998 34 34.5521 34 33.9998V25.4536C34 25.1653 33.8755 24.8909 33.6585 24.701Z"
        stroke="#6A7CA8"
        stroke-width={2}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
  <div className="w-[300px] h-[221px]">
    <p className="w-[300px] absolute left-[1088px] top-[797px] text-lg text-center text-[#849cd9]">
      Une même personne pour vous accompagner, de la recherche de votre appartement jusqu’à votre
      emménagement.{" "}
    </p>
    <p className="w-[189px] absolute left-[1143px] top-[737px] text-xl font-bold text-center text-[#0e215c]">
      Un unique conseiller dédié
    </p>
    <svg
      width={53}
      height={53}
      viewBox="0 0 53 53"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[53px] h-[53px] absolute left-[1210.5px] top-[667.5px]"
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
    </svg>
  </div>
  <div className="w-[300px] h-[198px]">
    <p className="w-[300px] absolute left-[424px] top-[797px] text-lg text-center text-[#849cd9]">
      <span className="w-[300px] text-lg text-center text-[#849cd9]">
        Prêt à Taux Zéro - TVA 5,5 %
      </span>
      <br />
      <span className="w-[300px] text-lg text-center text-[#849cd9]">
        Des remises(2) sur 100% des logements Nexity.
      </span>
    </p>
    <p className="w-[262px] absolute left-[443px] top-[737px] text-xl font-bold text-center text-[#0e215c]">
      Des aides pour votre premier achat{" "}
    </p>
    <svg
      width={53}
      height={53}
      viewBox="0 0 53 53"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[53px] h-[53px] absolute left-[546.5px] top-[667.5px]"
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
    </svg>
  </div>
  <p className="w-[1243px] absolute left-[125px] top-[1291px] text-lg font-light text-left text-[#98aad7]">
    <span className="w-[1243px] text-lg font-light text-left text-[#98aad7]">
      (1) Mensualité donnée à titre indicatif uniquement et non contractuelle, pour l’achat d’un
      appartement de respectivement 187.000 € (avec une remise de 4 200 €) et de 235 000 (avec une
      remise de 4 950 €), sur une base de durée de 25 ans, à un taux d’intérêt fixe moyen constaté
      sur le marché de 1.4%, hors frais, hors assurance et avec un apport personnel de 7.500€. Le
      résultat ne tient pas compte des différentes options fiscales éligibles.
    </span>
    <br />
    <span className="w-[1243px] text-lg font-light text-left text-[#98aad7]">
      Pour être éligible au PTZ : il doit s’agir de votre premier achat en résidence principale et
      votre revenu fiscal de référence sur l’année 2 ans avant la réservation de l’appartement doit
      être inférieur à 37 000 € pour une personne seul et 51 800 € pour deux
    </span>
    <br />
    <br />
    <span className="w-[1243px] text-lg font-light text-left text-[#98aad7]">
      (2) Offre ouverte à tous les locataires et anciens locataires de Nexity Studéa, et ce jusqu’à
      12 mois après la date d’échéance de leur bail, dans la limite d’une seule fois par bien
      acquis. Cette offre se traduira par une réduction correspondant à une somme, estimée,
      équivalente aux frais d’actes d’acquisition ou à la moitié de ces derniers (hors frais de
      financement et de garanties, notamment frais d’hypothèques, frais de cautionnement Crédit
      Logement, hors frais de règlement de copropriété ou cahier des charges, et hors frais de
      traduction) devant être versés par le réservataire au jour de la signature de l’acte
      authentique de vente. Réduction de prix soumise à la signature d’un acte authentique de vente,
      dans les délais stipulés au contrat de réservation. Cette somme, estimée à l’aide du barème
      rapide des notaires, est définitivement et forfaitairement arrêtée le jour de la signature du
      contrat de réservation.{" "}
    </span>
    <br />
  </p>
  <p className="w-[742px] absolute left-[114px] top-[246px] text-[28px] text-left text-[#113eb6]">
    <span className="w-[742px] text-[28px] font-bold text-left text-[#113eb6]">Studéa </span>
    <span className="w-[742px] text-[28px] text-left text-[#113eb6]">s’associe avec </span>
    <span className="w-[742px] text-[28px] font-bold text-left text-[#113eb6]">Kit le nid</span>
    <span className="w-[742px] text-[28px] text-left text-[#113eb6]"> afin d’aider </span>
    <br />
    <span className="w-[742px] text-[28px] text-left text-[#113eb6]">
      ses jeunes locataires à devenir propriétaires !
    </span>
  </p>
  <svg
    width={64}
    height={64}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-16 h-16"
    preserveAspectRatio="xMidYMid meet"
  >
    <rect
      x="7.68018"
      y="7.68018"
      width="49.92"
      height="49.92"
      rx="15.36"
      fill="url(#paint0_linear_1215_6397)"
    />
    <path
      d="M30.1868 38.7734C34.929 38.7734 38.7734 34.929 38.7734 30.1868C38.7734 25.4445 34.929 21.6001 30.1868 21.6001C25.4445 21.6001 21.6001 25.4445 21.6001 30.1868C21.6001 34.929 25.4445 38.7734 30.1868 38.7734Z"
      stroke="white"
      stroke-width="2.56"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M36.3198 36.3198L43.6798 43.6798"
      stroke="white"
      stroke-width="2.56"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <defs>
      <lineargradient
        id="paint0_linear_1215_6397"
        x1="32.6402"
        y1="5.20253"
        x2="32.6402"
        y2="61.6378"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.0434107" stop-color="#81A3F9" />
        <stop offset={1} stop-color="#3462D8" />
      </lineargradient>
    </defs>
  </svg>
  <div className="w-[162px] h-[65px]">
    <svg
      width={119}
      height={44}
      viewBox="0 0 119 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-[41.77px] top-[27.77px]"
      preserveAspectRatio="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M18.0896 28.7195L18.0839 28.7292C17.274 30.106 17.0111 31.1212 17.0111 31.8324C17.0111 32.6241 17.2228 33.2487 17.6237 33.797C18.1944 34.5392 18.7517 35.0211 19.2734 35.3227C20.1997 35.8335 21.0527 36.3335 21.8299 36.8229C22.2723 37.0844 22.7399 37.4027 23.1299 37.7894C23.4685 38.1252 24.1498 38.905 24.1498 40.0667C24.1498 41.1877 23.6044 42.2345 22.5777 42.8527C21.7551 43.348 20.847 43.4307 20.2007 43.4307C17.7402 43.4307 15.3866 42.1081 13.2293 40.2588L13.2212 40.2518L13.2132 40.2448C12.2754 39.4271 11.4833 38.5341 10.8693 37.5686C9.59877 39.1505 8.64397 40.295 8.01674 40.983C7.50572 41.561 6.99308 42.0816 6.49232 42.4789C6.23861 42.6802 5.93389 42.8934 5.58739 43.0652C5.25918 43.2279 4.74041 43.4307 4.1009 43.4307C2.4031 43.4307 1.36248 42.2757 0.840436 41.4474L0.792317 41.371L0.749837 41.2915C0.291686 40.4333 0 39.48 0 38.46C0 38.0485 0.0848159 37.5889 0.149824 37.2645C0.228275 36.8731 0.339991 36.3924 0.479493 35.8346C0.759224 34.7163 1.17267 33.2014 1.71509 31.3018C2.77286 27.5644 3.83857 23.0607 4.91009 17.7807C5.96539 12.5806 6.48044 7.94708 6.48044 3.86608C6.48044 3.5101 6.50155 3.11751 6.57577 2.73108C6.63742 2.41011 6.77682 1.86181 7.16293 1.34014C8.01694 0.147568 9.35653 0 10.0244 0C11.057 0 11.8418 0.480863 12.3425 0.936008C12.8106 1.36151 13.1609 1.87554 13.4289 2.35353C14.0839 3.42566 14.4291 4.61368 14.4291 5.87444C14.4291 10.6673 13.5936 16.4964 11.9622 23.3323C13.9622 20.754 15.7236 18.6591 17.2435 17.0575L17.2496 17.0511L17.2558 17.0447C17.9923 16.2795 18.6586 15.6404 19.2346 15.175C19.5198 14.9446 19.84 14.7097 20.1784 14.5205C20.4459 14.3708 21.0495 14.0585 21.8208 14.0585C23.1169 14.0585 24.1433 14.6721 24.8629 15.4333C25.3858 15.9605 26.1243 16.8938 26.1243 18.1756C26.1243 18.8711 25.8535 19.4066 25.7425 19.615C25.595 19.8919 25.4181 20.1447 25.257 20.3558C24.931 20.783 24.4961 21.2637 23.9964 21.7771C23.0492 22.7499 22.001 23.8229 20.852 24.9959C19.8737 25.9947 18.9508 27.2249 18.0952 28.7098L18.0896 28.7195ZM23.0359 17.1714C22.6647 16.7698 22.2596 16.5689 21.8208 16.5689C21.4158 16.5689 20.5045 17.3053 19.0869 18.7781C16.779 21.2099 13.8376 24.8899 10.2625 29.818C9.36789 31.0512 8.43357 32.3626 7.45958 33.7522C6.86127 34.6058 6.248 35.4888 5.61975 36.4014C5.68594 36.196 5.75161 35.9913 5.81675 35.7873C6.60235 33.3274 7.31182 30.9696 7.94518 28.7142C10.5802 19.3307 11.8977 11.7175 11.8977 5.87444C11.8977 5.28416 11.7792 4.72099 11.5423 4.18493C11.5115 4.11526 11.4788 4.04605 11.444 3.9773C11.4251 3.94009 11.4057 3.90302 11.3857 3.86608C11.34 3.7817 11.2913 3.69802 11.2395 3.61504C10.8345 2.87864 10.4295 2.51044 10.0244 2.51044C9.6194 2.51044 9.34938 2.61086 9.21437 2.8117C9.07936 2.97906 9.01186 3.33052 9.01186 3.86608C9.01186 4.14353 9.00959 4.42315 9.00506 4.70495C9.00459 4.73417 9.0041 4.76341 9.00358 4.79268C8.93191 8.83981 8.39463 13.3343 7.39175 18.276C6.31168 23.5982 5.2316 28.1672 4.15153 31.983C3.07146 35.7654 2.53142 37.9244 2.53142 38.46C2.53142 38.9955 2.68331 39.5478 2.98708 40.1169C3.3246 40.6524 3.69587 40.9202 4.1009 40.9202C4.50593 40.9202 5.18097 40.3846 6.12604 39.3135C6.4668 38.9406 6.92414 38.4075 7.49806 37.7141C7.50529 37.7054 7.51253 37.6966 7.51978 37.6879C7.66147 37.5166 7.81018 37.3356 7.96593 37.145C8.00498 37.0972 8.04447 37.0488 8.08441 36.9998C8.50509 36.4835 8.97483 35.8998 9.49363 35.2487C9.56635 35.1574 9.64003 35.0648 9.71468 34.9709C10.2632 34.2808 10.8637 33.5191 11.5163 32.686C11.6578 32.5052 11.8018 32.3211 11.9483 32.1337V32.686C11.9483 33.6398 12.1551 34.5548 12.5687 35.4309C13.0549 36.4609 13.8269 37.4371 14.8848 38.3596C16.0574 39.3648 17.1539 40.074 18.1744 40.4873C18.5343 40.6331 18.8848 40.7421 19.2258 40.8142C19.2525 40.8198 19.2791 40.8253 19.3056 40.8305C19.3313 40.8355 19.357 40.8403 19.3826 40.8449C19.6618 40.8951 19.9345 40.9202 20.2007 40.9202C21.1458 40.9202 21.6183 40.6357 21.6183 40.0667C21.6183 39.7654 21.2471 39.3972 20.5045 38.9621C20.4048 38.8991 20.3035 38.8359 20.2007 38.7723C20.103 38.7119 20.0039 38.6512 19.9034 38.5902C19.7031 38.4687 19.4974 38.3461 19.2861 38.2224C18.885 37.9875 18.4642 37.7487 18.0237 37.506C17.1462 37.0039 16.3361 36.2675 15.5936 35.2968C14.851 34.2926 14.4797 33.1378 14.4797 31.8324C14.4797 30.527 14.9523 29.0709 15.8973 27.4642C16.8424 25.8241 17.8887 24.4182 19.0363 23.2467C20.1839 22.0752 21.2302 21.004 22.1752 20.0333C23.1203 19.0626 23.5928 18.4434 23.5928 18.1756C23.5928 17.8744 23.4072 17.5396 23.0359 17.1714ZM20.3464 38.402C20.3464 38.402 20.34 38.4036 20.3252 38.405C20.3388 38.4025 20.3464 38.402 20.3464 38.402Z"
        fill="url(#paint0_linear_1215_6403)"
      />
      <path
        d="M30.7225 40.0063C30.2023 40.0063 29.7689 39.863 29.4222 39.5764C29.0947 39.2708 28.931 38.8409 28.931 38.2869V27.2259C28.931 26.6719 29.0947 26.2517 29.4222 25.9651C29.7689 25.6786 30.2023 25.5353 30.7225 25.5353C31.2426 25.5353 31.676 25.6786 32.0227 25.9651C32.3695 26.2517 32.5428 26.6719 32.5428 27.2259V38.2869C32.5428 38.8409 32.3695 39.2708 32.0227 39.5764C31.676 39.863 31.2426 40.0063 30.7225 40.0063ZM30.7225 22.9849C30.0675 22.9849 29.5474 22.813 29.1621 22.4691C28.7769 22.1062 28.5842 21.6381 28.5842 21.065C28.5842 20.4919 28.7769 20.0334 29.1621 19.6896C29.5474 19.3457 30.0675 19.1738 30.7225 19.1738C31.3581 19.1738 31.8686 19.3457 32.2539 19.6896C32.6584 20.0334 32.8607 20.4919 32.8607 21.065C32.8607 21.6381 32.668 22.1062 32.2828 22.4691C31.8975 22.813 31.3774 22.9849 30.7225 22.9849Z"
        fill="url(#paint1_linear_1215_6403)"
      />
      <path
        d="M43.7704 37.3413C44.7336 37.3986 45.2151 37.8285 45.2151 38.6308C45.2151 39.0893 45.0225 39.4427 44.6372 39.6911C44.2712 39.9203 43.7415 40.0158 43.048 39.9776L42.2679 39.9203C39.0316 39.6911 37.4135 37.9717 37.4135 34.7623V28.5154H35.9688C35.4487 28.5154 35.0441 28.4008 34.7552 28.1716C34.4855 27.9423 34.3507 27.608 34.3507 27.1686C34.3507 26.7293 34.4855 26.3949 34.7552 26.1657C35.0441 25.9364 35.4487 25.8218 35.9688 25.8218H37.4135V23.1855C37.4135 22.6697 37.5773 22.259 37.9047 21.9533C38.2322 21.6477 38.6753 21.4949 39.2339 21.4949C39.7733 21.4949 40.2067 21.6477 40.5342 21.9533C40.8616 22.259 41.0254 22.6697 41.0254 23.1855V25.8218H43.4815C44.0016 25.8218 44.3965 25.9364 44.6661 26.1657C44.9551 26.3949 45.0996 26.7293 45.0996 27.1686C45.0996 27.608 44.9551 27.9423 44.6661 28.1716C44.3965 28.4008 44.0016 28.5154 43.4815 28.5154H41.0254V35.0202C41.0254 36.4339 41.6803 37.1885 42.9902 37.284L43.7704 37.3413Z"
        fill="url(#paint2_linear_1215_6403)"
      />
      <path
        d="M56.2761 40.0063C55.756 40.0063 55.3226 39.863 54.9758 39.5764C54.6484 39.2708 54.4846 38.8409 54.4846 38.2869V21.1796C54.4846 20.6256 54.6484 20.2054 54.9758 19.9188C55.3226 19.6323 55.756 19.489 56.2761 19.489C56.7962 19.489 57.2297 19.6323 57.5764 19.9188C57.9231 20.2054 58.0965 20.6256 58.0965 21.1796V38.2869C58.0965 38.8409 57.9231 39.2708 57.5764 39.5764C57.2297 39.863 56.7962 40.0063 56.2761 40.0063Z"
        fill="url(#paint3_linear_1215_6403)"
      />
      <path
        d="M72.3177 35.9945C72.6451 35.9945 72.9052 36.1187 73.0978 36.367C73.3097 36.6154 73.4157 36.9497 73.4157 37.37C73.4157 37.9622 73.0593 38.4589 72.3466 38.8601C71.6916 39.223 70.95 39.5191 70.1217 39.7484C69.2933 39.9585 68.5035 40.0636 67.7523 40.0636C65.4792 40.0636 63.6781 39.4141 62.3489 38.115C61.0198 36.816 60.3552 35.0393 60.3552 32.7851C60.3552 31.3523 60.6441 30.0819 61.222 28.9739C61.7999 27.8659 62.609 27.0063 63.6492 26.3949C64.7087 25.7836 65.903 25.478 67.2322 25.478C68.5035 25.478 69.6112 25.755 70.5551 26.309C71.499 26.863 72.231 27.6462 72.7511 28.6587C73.2712 29.6712 73.5313 30.8652 73.5313 32.2406C73.5313 33.0621 73.1653 33.4728 72.4333 33.4728H63.9093C64.0248 34.791 64.4005 35.7653 65.0362 36.3957C65.6718 37.007 66.5965 37.3127 67.8101 37.3127C68.4265 37.3127 68.9659 37.2362 69.4282 37.0834C69.9098 36.9306 70.4491 36.7204 71.0463 36.453C71.6242 36.1473 72.048 35.9945 72.3177 35.9945ZM67.3189 27.9996C66.3364 27.9996 65.5466 28.3053 64.9495 28.9166C64.3716 29.5279 64.0248 30.4067 63.9093 31.5529H70.4395C70.401 30.3876 70.112 29.5088 69.5727 28.9166C69.0333 28.3053 68.282 27.9996 67.3189 27.9996Z"
        fill="url(#paint4_linear_1215_6403)"
      />
      <path
        d="M90.9292 25.478C92.6243 25.478 93.8861 25.9556 94.7144 26.9107C95.5427 27.8659 95.9569 29.3082 95.9569 31.2377V38.2869C95.9569 38.8218 95.7931 39.2421 95.4657 39.5478C95.1575 39.8534 94.724 40.0063 94.1654 40.0063C93.6068 40.0063 93.1637 39.8534 92.8362 39.5478C92.5088 39.2421 92.345 38.8218 92.345 38.2869V31.4383C92.345 30.3494 92.1331 29.5566 91.7093 29.0599C91.3048 28.5632 90.6595 28.3149 89.7734 28.3149C88.7332 28.3149 87.8952 28.6396 87.2595 29.2891C86.6431 29.9387 86.3349 30.8079 86.3349 31.8968V38.2869C86.3349 38.8218 86.1711 39.2421 85.8437 39.5478C85.5162 39.8534 85.0731 40.0063 84.5145 40.0063C83.9559 40.0063 83.5128 39.8534 83.1853 39.5478C82.8771 39.2421 82.723 38.8218 82.723 38.2869V27.1973C82.723 26.7006 82.8868 26.2994 83.2142 25.9938C83.5417 25.6881 83.9848 25.5353 84.5434 25.5353C85.0442 25.5353 85.4488 25.6881 85.757 25.9938C86.0845 26.2803 86.2482 26.6624 86.2482 27.14V27.9137C86.7298 27.1304 87.3751 26.5287 88.1842 26.1084C88.9932 25.6881 89.9082 25.478 90.9292 25.478Z"
        fill="url(#paint5_linear_1215_6403)"
      />
      <path
        d="M100.274 40.0063C99.7536 40.0063 99.3202 39.863 98.9735 39.5764C98.646 39.2708 98.4823 38.8409 98.4823 38.2869V27.2259C98.4823 26.6719 98.646 26.2517 98.9735 25.9651C99.3202 25.6786 99.7536 25.5353 100.274 25.5353C100.794 25.5353 101.227 25.6786 101.574 25.9651C101.921 26.2517 102.094 26.6719 102.094 27.2259V38.2869C102.094 38.8409 101.921 39.2708 101.574 39.5764C101.227 39.863 100.794 40.0063 100.274 40.0063ZM100.274 22.9849C99.6188 22.9849 99.0987 22.813 98.7134 22.4691C98.3282 22.1062 98.1355 21.6381 98.1355 21.065C98.1355 20.4919 98.3282 20.0334 98.7134 19.6896C99.0987 19.3457 99.6188 19.1738 100.274 19.1738C100.909 19.1738 101.42 19.3457 101.805 19.6896C102.21 20.0334 102.412 20.4919 102.412 21.065C102.412 21.6381 102.219 22.1062 101.834 22.4691C101.449 22.813 100.929 22.9849 100.274 22.9849Z"
        fill="url(#paint6_linear_1215_6403)"
      />
      <path
        d="M117.151 19.489C117.69 19.489 118.133 19.6418 118.48 19.9474C118.827 20.2531 119 20.6543 119 21.151V38.2869C119 38.8027 118.836 39.2134 118.509 39.5191C118.181 39.8248 117.748 39.9776 117.209 39.9776C116.669 39.9776 116.236 39.8248 115.908 39.5191C115.581 39.2134 115.417 38.8027 115.417 38.2869V37.5705C114.993 38.3538 114.377 38.9651 113.568 39.4045C112.778 39.8439 111.873 40.0636 110.852 40.0636C109.638 40.0636 108.55 39.7579 107.587 39.1466C106.643 38.5353 105.901 37.6756 105.362 36.5676C104.842 35.4405 104.581 34.151 104.581 32.6991C104.581 31.2472 104.842 29.9768 105.362 28.8879C105.901 27.799 106.643 26.9585 107.587 26.3663C108.53 25.774 109.619 25.4779 110.852 25.4779C111.873 25.4779 112.778 25.6881 113.568 26.1084C114.358 26.5286 114.964 27.1209 115.388 27.885V21.0937C115.388 20.6161 115.542 20.234 115.85 19.9474C116.178 19.6418 116.611 19.489 117.151 19.489ZM111.805 37.284C112.961 37.284 113.847 36.8924 114.464 36.1091C115.099 35.3259 115.417 34.2083 115.417 32.7564C115.417 31.3045 115.099 30.1965 114.464 29.4324C113.847 28.6491 112.971 28.2575 111.834 28.2575C110.678 28.2575 109.783 28.6396 109.147 29.4037C108.511 30.1679 108.193 31.2663 108.193 32.6991C108.193 34.151 108.511 35.2781 109.147 36.0805C109.783 36.8828 110.669 37.284 111.805 37.284Z"
        fill="url(#paint7_linear_1215_6403)"
      />
      <defs>
        <lineargradient
          id="paint0_linear_1215_6403"
          x1="0.168196"
          y1="10.8598"
          x2="46.6731"
          y2="56.4553"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#CC95DF" />
          <stop offset={1} stop-color="#4F80FF" />
        </lineargradient>
        <lineargradient
          id="paint1_linear_1215_6403"
          x1="0.168196"
          y1="10.8598"
          x2="46.6731"
          y2="56.4553"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#CC95DF" />
          <stop offset={1} stop-color="#4F80FF" />
        </lineargradient>
        <lineargradient
          id="paint2_linear_1215_6403"
          x1="0.168196"
          y1="10.8598"
          x2="46.6731"
          y2="56.4553"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#CC95DF" />
          <stop offset={1} stop-color="#4F80FF" />
        </lineargradient>
        <lineargradient
          id="paint3_linear_1215_6403"
          x1="0.168196"
          y1="10.8598"
          x2="46.6731"
          y2="56.4553"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#CC95DF" />
          <stop offset={1} stop-color="#4F80FF" />
        </lineargradient>
        <lineargradient
          id="paint4_linear_1215_6403"
          x1="0.168196"
          y1="10.8598"
          x2="46.6731"
          y2="56.4553"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#CC95DF" />
          <stop offset={1} stop-color="#4F80FF" />
        </lineargradient>
        <lineargradient
          id="paint5_linear_1215_6403"
          x1="0.168196"
          y1="10.8598"
          x2="46.6731"
          y2="56.4553"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#CC95DF" />
          <stop offset={1} stop-color="#4F80FF" />
        </lineargradient>
        <lineargradient
          id="paint6_linear_1215_6403"
          x1="0.168196"
          y1="10.8598"
          x2="46.6731"
          y2="56.4553"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#CC95DF" />
          <stop offset={1} stop-color="#4F80FF" />
        </lineargradient>
        <lineargradient
          id="paint7_linear_1215_6403"
          x1="0.168196"
          y1="10.8598"
          x2="46.6731"
          y2="56.4553"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#CC95DF" />
          <stop offset={1} stop-color="#4F80FF" />
        </lineargradient>
      </defs>
    </svg>
    <svg
      width={23}
      height={18}
      viewBox="0 0 23 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-[138.5px] top-[72.5px]"
      preserveAspectRatio="none"
    >
      <path
        d="M5.96 14.28C5.06667 14.28 4.38 14.1267 3.9 13.82C3.42 13.5133 3.06667 13.1733 2.84 12.8H2.48V14H0V0H2.52V5.22H2.88C3.02667 4.98 3.22 4.75333 3.46 4.54C3.71333 4.32667 4.04 4.15333 4.44 4.02C4.85333 3.87333 5.36 3.8 5.96 3.8C6.76 3.8 7.5 4 8.18 4.4C8.86 4.78667 9.40667 5.36 9.82 6.12C10.2333 6.88 10.44 7.8 10.44 8.88V9.2C10.44 10.28 10.2333 11.2 9.82 11.96C9.40667 12.72 8.86 13.3 8.18 13.7C7.5 14.0867 6.76 14.28 5.96 14.28ZM5.2 12.08C5.97333 12.08 6.62 11.8333 7.14 11.34C7.66 10.8333 7.92 10.1 7.92 9.14V8.94C7.92 7.98 7.66 7.25333 7.14 6.76C6.63333 6.25333 5.98667 6 5.2 6C4.42667 6 3.78 6.25333 3.26 6.76C2.74 7.25333 2.48 7.98 2.48 8.94V9.14C2.48 10.1 2.74 10.8333 3.26 11.34C3.78 11.8333 4.42667 12.08 5.2 12.08Z"
        fill="#849CD9"
      />
      <path
        d="M13.8339 18V15.8H19.2339C19.6072 15.8 19.7939 15.6 19.7939 15.2V12.7H19.4339C19.3272 12.9267 19.1606 13.1533 18.9339 13.38C18.7072 13.6067 18.4006 13.7933 18.0139 13.94C17.6272 14.0867 17.1339 14.16 16.5339 14.16C15.7606 14.16 15.0806 13.9867 14.4939 13.64C13.9206 13.28 13.4739 12.7867 13.1539 12.16C12.8339 11.5333 12.6739 10.8133 12.6739 10V4.08H15.1939V9.8C15.1939 10.5467 15.3739 11.1067 15.7339 11.48C16.1072 11.8533 16.6339 12.04 17.3139 12.04C18.0872 12.04 18.6872 11.7867 19.1139 11.28C19.5406 10.76 19.7539 10.04 19.7539 9.12V4.08H22.2739V15.76C22.2739 16.44 22.0739 16.98 21.6739 17.38C21.2739 17.7933 20.7406 18 20.0739 18H13.8339Z"
        fill="#849CD9"
      />
    </svg>
    <img
      src="static/img/icons/House1.svg"
      className="w-[38px] h-[38px] absolute left-[165.86px] top-[54.86px] object-cover"
    />
  </div>
  <div className="w-[300px] h-[195px]">
    <p className="w-[300px] absolute left-[756px] top-[771px] text-lg text-center text-[#849cd9]">
      Télécharger gratuitement les plans des appartements et les plaquettes de présentation de nos
      résidences.
    </p>
    <p className="absolute left-[804px] top-[737px] text-xl font-bold text-center text-[#0e215c]">
      Accès libre aux plans
    </p>
    <svg
      width={53}
      height={53}
      viewBox="0 0 53 53"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[53px] h-[53px] absolute left-[878.5px] top-[667.5px]"
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
    </svg>
  </div>
  <p className="w-[488px] absolute left-[179px] top-[1061px] text-lg text-left text-[#849cd9]">
    N’attendez pas d’avoir 30 ans pour devenir propriétaire ! Découvrez comment avec notre guide
    gratuit.
  </p>
  <p className="w-[567px] absolute left-[179px] top-[1013px] text-[28px] font-bold text-left text-[#113eb6]">
    Découvrez notre guide du premier achat.
  </p>
  <div className="w-[233.63px] h-[205px]">
    
    <img
      src="static/img/GuideA.svg"
      className="w-[205px] h-[205px] absolute left-[990.5px] top-[997.5px] rounded-[10px] object-cover"
    />
  </div>
  <div
    className="flex justify-center items-center w-[295px] absolute left-[1152px] top-[33px] gap-2.5 px-[120px] py-4 rounded-xl"
    style={{ background: "linear-gradient(to bottom, #81a3f9 -0.06%, #3462d8 108.09%)" }}
  >
    <p className="flex-grow-0 flex-shrink-0 text-sm font-bold text-left text-white">
      Connexion / Inscription
    </p>
  </div>
  <p className="absolute left-[1062px] top-[45px] text-xl font-bold text-center text-[#113eb6]">
    Blog
  </p>
  <p className="absolute left-[836px] top-[45px] text-xl font-bold text-center text-[#113eb6]">
    Qui sommes-nous ?
  </p>
  <div className="w-[72px] h-[37px]">
    <p className="absolute left-[732px] top-[45px] text-xl font-bold text-center text-[#113eb6]">
      Accueil
    </p>
    <svg
      width={30}
      height={3}
      viewBox="0 0 30 3"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-[751.5px] top-[80.5px]"
      preserveAspectRatio="xMidYMid meet"
    >
      <line y1="1.5" x2={30} y2="1.5" stroke="#113EB6" stroke-width={3} />
    </svg>
  </div>
  
  
 
 
</div>;
      </>
       )}
        </>
  )
}
