'use client';
import React from 'react';
import styled from "styled-components";
import {useGlobalContext, useGlobalUpdateContext} from "@/app/context/globalProvider";
import Image from "next/image";
import menu from "@/app/utils/menu";
import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";
import {UserButton, useClerk, useUser} from "@clerk/nextjs";
import {logout} from "@/app/utils/icons";
import Button from "@/app/components/Button/button";

function Sidebar() {
  const {theme, summary} = useGlobalContext();
  const {clearAnimes} = useGlobalUpdateContext();

  const router = useRouter();
  const pathname = usePathname()

  const { signOut } = useClerk();
  const { user } = useUser();

  const { firstName, lastName, imageUrl } = user || {
    firstName: "Kuriyama",
    lastName: "Mirai",
    imageUrl: "/Kuriyama Mirai.jpg",
  };

  const handleClick = (link) => {
    if (link !== pathname) {
      clearAnimes();
    }
    router.push(link);
  };

  return (
    <SidebarStyled theme={theme}>
      <div className="profile">
        <div className="profile-overlay"></div>
        <div className="image">
          <Image width={70} height={70} src="/Kuriyama Mirai.jpg" alt="profile"/>
        </div>
        <div className="user-btn absolute z-20 top-0 w-full h-full">
          <UserButton afterSignOutUrl="/sign-in"/>
        </div>
        <div className="flex flex-col ms-2">
          <h1 className="capitalize">{firstName}</h1>
          <h1 className="capitalize">{lastName}</h1>
        </div>
      </div>
      <ul className="nav-items">
        {menu.map((item) => {
          const link = item.link;
          return (
            <li
              key={item.id}
              className={`nav-item ${pathname === link ? "active" : ""}`}
              onClick={() => {
                handleClick(link);
              }}
            >
              {item.icon}
              <Link href={link}>{item.title}</Link>
              <div className="badge">{summary[item.bias]}</div>
            </li>
          );
        })}
      </ul>
      <div className="sign-out relative m-6">
        <Button
          name={"Sign Out"}
          type={"submit"}
          padding={"0.4rem 0.8rem"}
          borderRad={"0.8rem"}
          fw={"500"}
          fs={"1.2rem"}
          icon={logout}
          click={() => {
            signOut(() => router.push("/sign-in"));
          }}
        />
      </div>
    </SidebarStyled>
  );
}

const SidebarStyled = styled.nav`
    position: relative;
    width: ${props => props.theme.sidebarWidth};
    background-color: ${props => props.theme.colorBg2};
    border: 2px solid ${props => props.theme.borderColor2};
    border-radius: 1rem;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    color: ${(props) => props.theme.colorGrey3};

    @media screen and (max-width: 768px) {
        position: fixed;
        height: calc(100vh - 2rem);
        z-index: 100;

        transition: all 0.3s cubic-bezier(0.53, 0.21, 0, 1);
        transform: ${(props) =>
                props.collapsed ? "translateX(-107%)" : "translateX(0)"};

        .toggle-nav {
            display: block !important;
        }
    }

    .toggle-nav {
        display: none;
        padding: 0.8rem 0.9rem;
        position: absolute;
        right: -69px;
        top: 1.8rem;

        border-top-right-radius: 1rem;
        border-bottom-right-radius: 1rem;

        background-color: ${(props) => props.theme.colorBg2};
        border-right: 2px solid ${(props) => props.theme.borderColor2};
        border-top: 2px solid ${(props) => props.theme.borderColor2};
        border-bottom: 2px solid ${(props) => props.theme.borderColor2};
    }

    .user-btn {
        .cl-rootBox {
            width: 100%;
            height: 100%;

            .cl-userButtonBox {
                width: 100%;
                height: 100%;

                .cl-userButtonTrigger {
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                }
            }
        }
    }

    .profile {
        margin: 0.8rem;
        padding: 1rem 0.8rem;
        position: relative;

        border-radius: 1rem;
        cursor: pointer;

        font-weight: 500;
        color: ${(props) => props.theme.colorGrey0};

        display: flex;
        align-items: center;

        .profile-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            backdrop-filter: blur(10px);
            z-index: 0;
            background: ${(props) => props.theme.colorBg3};
            transition: all 0.55s linear;
            border-radius: 1rem;
            border: 2px solid ${(props) => props.theme.borderColor2};

            opacity: 0.2;
        }

        h1 {
            font-size: 1.2rem;
            display: flex;
            flex-direction: column;

            line-height: 1.4rem;
        }
        
        .capitalize {
            width: 8rem;
            line-height: 2rem;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            text-overflow: ellipsis;
        }

        .image,
        h1 {
            position: relative;
            z-index: 1;
        }

        .image {
            flex-shrink: 0;
            display: inline-block;
            overflow: hidden;
            transition: all 0.5s ease;
            border-radius: 100%;

            width: 70px;
            height: 70px;

            img {
                border-radius: 100%;
                transition: all 0.5s ease;
            }
        }

        > h1 {
            margin-left: 0.8rem;
            font-size: clamp(1.2rem, 4vw, 1.4rem);
            line-height: 100%;
        }

        &:hover {
            .profile-overlay {
                opacity: 1;
                border: 2px solid ${(props) => props.theme.borderColor2};
            }

            img {
                transform: scale(1.1);
            }
        }
    }
    
    .nav-items {
        li {
            height: 45px;
        }
    }

    .nav-item {
        position: relative;
        padding: 0.6rem 1rem 0.6rem 0.6rem;
        margin: 0.3rem 0;

        display: grid;
        grid-template-columns: 40px 1fr 40px;
        cursor: pointer;
        align-items: center;

        &::after {
            position: absolute;
            content: "";
            left: 0;
            top: 0;
            width: 0;
            height: 100%;
            background-color: ${(props) => props.theme.activeNavLinkHover};
            z-index: 1;
            transition: all 0.3s ease-in-out;
        }

        &::before {
            position: absolute;
            content: "";
            right: 0;
            top: 0;
            width: 0%;
            height: 100%;
            background-color: ${(props) => props.theme.colorGreenDark};

            border-bottom-left-radius: 5px;
            border-top-left-radius: 5px;
        }

        a {
            font-weight: 500;
            transition: all 0.3s ease-in-out;
            z-index: 2;
            line-height: 0;
        }

        i {
            display: flex;
            align-items: center;
            justify-content: center;
            color: ${(props) => props.theme.colorIcons};
        }

        &:hover {
            &::after {
                width: 100%;
            }
        }
        
        .badge {
            display: flex;
            align-items: center;
            justify-content: center;
            background: ${(props) => props.theme.colorGrey4};
            border-radius: 20px;
        }
    }

    .active {
        background-color: ${(props) => props.theme.activeNavLink};

        i,
        a {
            color: ${(props) => props.theme.colorIcons2};
        }
    }

    .active::before {
        width: 0.3rem;
    }

    > button {
        margin: 1.5rem;
    }
`;


export default Sidebar;