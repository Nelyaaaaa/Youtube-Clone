import React from "react";

import { AiFillHome, AiOutlineFlag } from "react-icons/ai";
import { MdLocalFireDepartment, MdLiveTv } from "react-icons/md";
import { CgMusicNote } from "react-icons/cg";
import { FiFilm } from "react-icons/fi";
import { IoGameControllerSharp } from "react-icons/io5";
import { ImNewspaper } from "react-icons/im";
import { GiDiamondTrophy, GiEclipse } from "react-icons/gi";
import { RiLightbulbLine, RiFeedbackLine } from "react-icons/ri";
import { FiSettings, FiHelpCircle } from "react-icons/fi";

export const categories = [
    { name: "Accueil", icon: <AiFillHome />, type: "home" },
    { name: "Tendances", icon: <MdLocalFireDepartment />, type: "category" },
    { name: "Musique", icon: <CgMusicNote />, type: "category" },
    { name: "Films et séries", icon: <FiFilm />, type: "category" },
    { name: "Direct", icon: <MdLiveTv />, type: "category" },
    { name: "Jeux vidéos", icon: <IoGameControllerSharp />, type: "category" },
    { name: "Actualités", icon: <ImNewspaper />, type: "category" },
    { name: "Sport", icon: <GiDiamondTrophy />, type: "category" },
    { name: "Savoir et cultures", icon: <RiLightbulbLine />, type: "category" },
    {
        name: "Mode et beauté",
        icon: <GiEclipse />,
        type: "category",
        divider: true,
    },
    { name: "Paramètres", icon: <FiSettings />, type: "menu" },
    { name: "Historique des signalements", icon: <AiOutlineFlag />, type: "menu" },
    { name: "Aide", icon: <FiHelpCircle />, type: "menu" },
    { name: "Envoyer des commentaires", icon: <RiFeedbackLine />, type: "menu" },
];