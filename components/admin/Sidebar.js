import React from 'react';
import Link from 'next/link';

import { Icon } from '../form';

const menuList = [
  {
    title: 'UTILISATEURS',
    menu: [
      {
        slug: 'List',
        name: 'Location',
        path: '/admin',
        iconType: 'house',
      },
    ],
  },
  {
    title: 'ADMINISTRATIONS',
    menu: [
      {
        slug: 'partners',
        name: 'Offres partenaires',
        path: '/admin/partners',
        iconType: 'house',
      },
    ],
  },
];
const Sidebar = ({ notifications = {} }) => {
  return (
    <div id="sidebar">
      <ul>
        {menuList.map(({ title, menu }, index) => (
          <li key={index}>
            <h2>{title}</h2>
            <ul>
              {menu.map(({ slug, name, path, iconType }, i) => (
                <Link href={path} exact activeClassName="active" key={i}>
                  <li>
                    <h3>
                      <Icon type={iconType} />
                      <span className="link-title">{name}</span>
                      {notifications[slug] ? (
                        <span className="info">{notifications[slug]}</span>
                      ) : (
                        ''
                      )}
                    </h3>
                  </li>
                </Link>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
