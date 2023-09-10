import React from 'react'
import { Link } from 'react-router-dom';

export const Header = () => {

    const logoUrl = "https://wncbroadband.org/blog/wp-content/uploads/2020/08/fcc-logo.png";

  return (
    <header>
        <div className={"bg-gray-200 py-1 flex justify-center items-center rounded-md"}>
            <Link to="/">Main Page</Link>
            <img className={'mx-4'} src={logoUrl} width="50px" height="50px" alt="logo" />
            <Link to={'/contacts'}>Contact Page</Link>
        </div>
    </header>
  )
}
