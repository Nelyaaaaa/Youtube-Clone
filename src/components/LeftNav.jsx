import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import LeftNavMenu from './LeftNavMenu';
import { categories } from '../utils/constants';
import { Context } from '../context/contextApi';


const LeftNav = () => {

  const { selectCategories, setSelectCategories, mobileMenu } = useContext(Context);

  const navigate = useNavigate();

  const clickHandler = (name, type) => {
    if (type === "category" || type === "home") {
      setSelectCategories(name);
    } else if (type === "menu") {
      return false;
    }
  }

  return (
    
    <div className={`md:block w-[240px] overflow-y-auto h-full py-4 bg-[#0f0f0f] absolute md:relative z-10 translate-x-[-240px] md:translate-x-0 transition-all ${mobileMenu ? "translate-x-0" : ""}`}>
      <div className="flex px-5 flex-col">
        {categories.map((item) => {
          return (
            <React.Fragment key={item.name}>
              <LeftNavMenu
                text={item.type === "home" ? "Accueil" : item.name}
                icon={item.icon}
                action={() => {
                  clickHandler(item.name, item.type);
                  navigate("/");
                 }}
                className={`${selectCategories === item.name ? "bg-white/[0.15] font-semibold" : "" }`}
              />
              {item.divider && (
                <hr className='my-5 border-white/[0.2]' />
              )}
            </React.Fragment>
          );
        })}
        <hr className='my-5 border-white/[0.2]' />
        <div className='text-white/[0.5] text-[12px] ml-3'>
          Cloné par N.Nouader Dev
        </div>
      </div>
    </div>
  )
}

export default LeftNav
