import React from 'react';
import { Typo, TypoTypesList } from '../../components/form/Typo';

export default {
  title: 'Ui/Typo',
  component: Typo,
  parameters: {
    layout: 'padded',
  },
};

const Template = () =>
  TypoTypesList.map((type) => (
    <div>
      <Typo type={type} className="mb-4 capitalize">
        {type}
      </Typo>
      <div
        className="flex justify-center items-center relative gap-2.5 px-[120px] py-4 rounded-xl"
        style={{
          background:
            'linear-gradient(to bottom, #81a3f9 -0.06%, #3462d8 108.09%)',
        }}
      >
        <p class="flex-grow-0 flex-shrink-0 text-sm font-bold text-left text-white">
          Connexion
        </p>
      </div>
      <div class="flex flex-col justify-start items-start w-[343px] relative gap-2 p-6 rounded-xl bg-white border border-[#eaeffa]">
        <p class="flex-grow-0 flex-shrink-0 w-[295px] text-lg font-bold text-left text-[#0e215c]">
          La Banque Postale peut sûrement financer ton projet !
        </p>
        <p class="self-stretch flex-grow-0 flex-shrink-0 w-[295px] text-sm font-medium text-left text-[#6976a0]">
          Kit le nid et La Banque Postale s'unissent pour t'aider à voler de tes
          propres ailes.
        </p>
        <div class="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-2.5 px-10 py-3 rounded-xl border border-[#3679ff]">
          <p class="flex-grow-0 flex-shrink-0 text-sm font-bold text-left text-[#3679ff]">
            Découvrir
          </p>
        </div>
      </div>
      <div
        class="flex flex-col justify-start items-start w-[344px] relative gap-2 p-6 rounded-xl"
        style={{
          background:
            'linear-gradient(219.21deg, rgba(195,153,219,0.1) -0.85%, rgba(88,130,247,0.1) 106.68%);',
        }}
      >
        <svg
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="flex-grow-0 flex-shrink-0 w-[34px] h-[34px]"
          preserveAspectRatio="none"
        >
          <rect
            width="34"
            height="34"
            rx="11"
            fill="url(#paint0_linear_483_5298)"
          ></rect>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M19.3093 20.2255L19.3067 20.2299C18.9347 20.864 18.814 21.3314 18.814 21.659C18.814 22.0235 18.9112 22.3112 19.0953 22.5637C19.3575 22.9055 19.6134 23.1273 19.8531 23.2662C20.2786 23.5015 20.6704 23.7317 21.0274 23.9571C21.2306 24.0775 21.4454 24.2241 21.6245 24.4022C21.7801 24.5568 22.093 24.9159 22.093 25.4509C22.093 25.9671 21.8425 26.4492 21.3709 26.7339C20.993 26.9619 20.5759 27 20.2791 27C19.1488 27 18.0677 26.391 17.0768 25.5393L17.0731 25.5361L17.0694 25.5329C16.6386 25.1563 16.2748 24.7451 15.9927 24.3005C15.4091 25.029 14.9705 25.556 14.6824 25.8728C14.4477 26.139 14.2122 26.3787 13.9822 26.5617C13.8657 26.6544 13.7257 26.7526 13.5665 26.8317C13.4158 26.9067 13.1775 27 12.8837 27C12.1038 27 11.6258 26.4682 11.386 26.0867L11.3639 26.0515L11.3444 26.0149C11.134 25.6197 11 25.1807 11 24.711C11 24.5215 11.039 24.3098 11.0688 24.1605C11.1049 23.9802 11.1562 23.7588 11.2203 23.502C11.3487 22.987 11.5387 22.2894 11.7878 21.4146C12.2737 19.6935 12.7632 17.6195 13.2554 15.1881C13.7402 12.7934 13.9767 10.6597 13.9767 8.78035C13.9767 8.61642 13.9864 8.43563 14.0205 8.25767C14.0489 8.10986 14.1129 7.85737 14.2902 7.61714C14.6825 7.06796 15.2979 7 15.6047 7C16.0789 7 16.4395 7.22144 16.6694 7.43104C16.8844 7.62698 17.0454 7.86369 17.1685 8.08381C17.4693 8.57753 17.6279 9.12462 17.6279 9.7052C17.6279 11.9123 17.2441 14.5966 16.4948 17.7446C17.4134 16.5573 18.2225 15.5926 18.9207 14.8551L18.9235 14.8521L18.9263 14.8492C19.2646 14.4968 19.5707 14.2025 19.8353 13.9882C19.9663 13.882 20.1134 13.7739 20.2688 13.6867C20.3917 13.6178 20.6689 13.474 21.0233 13.474C21.6186 13.474 22.0901 13.7566 22.4206 14.1071C22.6608 14.3499 23 14.7797 23 15.3699C23 15.6902 22.8756 15.9368 22.8246 16.0328C22.7569 16.1603 22.6756 16.2767 22.6016 16.3739C22.4519 16.5707 22.2521 16.792 22.0226 17.0284C21.5875 17.4764 21.106 17.9706 20.5782 18.5107C20.1288 18.9707 19.7049 19.5372 19.3119 20.221L19.3093 20.2255ZM20.346 24.6843C20.346 24.6843 20.343 24.685 20.3363 24.6857C20.3425 24.6845 20.346 24.6843 20.346 24.6843Z"
            fill="white"
          ></path>
          <defs>
            <linearGradient
              id="paint0_linear_483_5298"
              x1="32.375"
              y1="-1.5625"
              x2="2.06411e-7"
              y2="38.125"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#C399DB"></stop>
              <stop offset="1" stop-color="#5882F7"></stop>
            </linearGradient>
          </defs>
        </svg>
        <p class="flex-grow-0 flex-shrink-0 w-[295px] text-lg font-bold text-left">
          Le mot de Kit le nid.
        </p>
        <p class="self-stretch flex-grow-0 flex-shrink-0 w-[296px] text-sm font-medium text-left text-[#6976a0]">
          Kit le nid aime bien faire des prouts dans les logements, et ça tombe
          bien parce que il y a un piano livré avec l’appartement ! À vous les
          gateaux aux chocolats mmmm !
        </p>
      </div>
    </div>
  ));

export const Default = Template.bind({});
