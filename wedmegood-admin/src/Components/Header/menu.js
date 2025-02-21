import { faAngleDown } from '@fortawesome/free-solid-svg-icons/faAngleDown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react';
import './menu.css'

const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen((prevState) => !prevState);  // Toggle kare che
    };
    return (
        <>

            <nav class="navbar show navbar-vertical h-lg-screen navbar-expand-lg px-0 py-3 navbar-light bg-white border-bottom border-bottom-lg-0 border-end-lg" id="navbarVertical">
                <div class="container-fluid">
                    <button class="navbar-toggler ms-n2" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarCollapse" aria-controls="sidebarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <a class="align-items-center d-flex fs-4 mb-lg-5 me-0 navbar-brand px-lg-6 py-lg-2 gap-1" href="#">
                        <img src={require('../../Images/logo1.png')} alt="..." /><span>Wed<b className='text_primary'>Me</b>Good
                        </span>
                    </a>
                    <div class="navbar-user d-lg-none">
                        <div class="dropdown">
                            <a href="#" id="sidebarAvatar" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <div class="avatar-parent-child">
                                    <img alt="Image Placeholder" src="https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80" class="avatar avatar- rounded-circle" />
                                    <span class="avatar-child avatar-badge bg-success"></span>
                                </div>
                            </a>
                            <div class="dropdown-menu dropdown-menu-end" aria-labelledby="sidebarAvatar">
                                <a href="#" class="dropdown-item">Profile</a>
                                <a href="#" class="dropdown-item">Settings</a>
                                <a href="#" class="dropdown-item">Billing</a>
                                <hr class="dropdown-divider" />
                                <a href="#" class="dropdown-item">Logout</a>
                            </div>
                        </div>
                    </div>
                    <div class="collapse navbar-collapse" id="sidebarCollapse">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link" href="#">
                                    <i class="bi bi-house"></i> Dashboard
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-black" href="">
                                    <i class="bi bi-bar-chart"></i> Vendors <FontAwesomeIcon icon={faAngleDown} onClick={toggleDropdown} />
                                </a>
                            </li>
                            {isOpen && (
                                <div
                                    className="dropdown-content ps-3 pt-1 pe-2 pb-2"
                                    style={{
                                        border: "none",
                                        background: "#fff",
                                        width: "100%",
                                    }}
                                >
                                    <div class="">
                                        <a href="/photographer" className='view_vanuew'>
                                            <div class="menu_list_hov text-black-50 ms-12" style={{ lineHeight: '2rem' }}>Photographer</div></a>
                                        <a href="/venue" className='view_vanuew'>
                                            <div class="menu_list_hov text-black-50 ms-12" style={{ lineHeight: '2rem' }}>Prewedding</div></a>
                                        <a href="/venue" className='view_vanuew'>
                                            <div class="menu_list_hov text-black-50 ms-12" style={{ lineHeight: '2rem' }}>MakeUp</div></a>
                                        <a href="/venue" className='view_vanuew'>
                                            <div class="menu_list_hov text-black-50 ms-12" style={{ lineHeight: '2rem' }}>Mehandi</div></a>
                                        <a href="/venue" className='view_vanuew'>
                                            <div class="menu_list_hov text-black-50 ms-12" style={{ lineHeight: '2rem' }}>Music & Dance</div></a>
                                        <a href="/venue" className='view_vanuew'>
                                            <div class="menu_list_hov text-black-50 ms-12" style={{ lineHeight: '2rem' }}>Planning & Decor</div></a>
                                        <a href="/venue" className='view_vanuew'>
                                            <div class="menu_list_hov text-black-50 ms-12" style={{ lineHeight: '2rem' }}>Food</div></a>
                                    </div>
                                </div>
                            )}


                            {/* <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="vendorDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="bi bi-bar-chart"></i> Vendors
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="vendorDropdown">
                                    <li><a class="dropdown-item" href="#">Photographer</a></li>
                                    <li><a class="dropdown-item" href="#">Prewedding</a></li>
                                    <li><a class="dropdown-item" href="#">MakeUp</a></li>
                                    <li><a class="dropdown-item" href="#">Mehandi</a></li>
                                    <li><a class="dropdown-item" href="#">Music & Dance</a></li>
                                    <li><a class="dropdown-item" href="#">Planning & Decor</a></li>
                                    <li><a class="dropdown-item" href="#">Food</a></li>
                                </ul>
                            </li> */}

                            <li class="nav-item">
                                <a class="nav-link" href="#">
                                    <i class="bi bi-chat"></i> Messages
                                    <span class="badge bg-soft-primary text-primary rounded-pill d-inline-flex align-items-center ms-auto">6</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/venues">
                                    <i class="bi bi-chat"></i> Venues
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/real-wedding">
                                    <i class="bi bi-chat"></i> Real Wedding
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/service">
                                    <i class="bi bi-chat"></i> Services
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">
                                    <i class="bi bi-bookmarks"></i> Collections
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/user">
                                    <i class="bi bi-people"></i> Users
                                </a>
                            </li>
                        </ul>
                        <hr class="navbar-divider my-5 opacity-20" />
                        <ul class="navbar-nav mb-md-4">
                            <li>
                                <div class="nav-link text-xs font-semibold text-uppercase text-muted ls-wide" href="#">
                                    Contacts
                                    <span class="badge bg-soft-primary text-primary rounded-pill d-inline-flex align-items-center ms-4">13</span>
                                </div>
                            </li>
                            <li>
                                <a href="#" class="nav-link d-flex align-items-center">
                                    <div class="me-4">
                                        <div class="position-relative d-inline-block text-white">
                                            <img alt="Image Placeholder" src="https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80" class="avatar rounded-circle" />
                                            <span class="position-absolute bottom-2 end-2 transform translate-x-1/2 translate-y-1/2 border-2 border-solid border-current w-3 h-3 bg-success rounded-circle"></span>
                                        </div>
                                    </div>
                                    <div>
                                        <span class="d-block text-sm font-semibold">
                                            Marie Claire
                                        </span>
                                        <span class="d-block text-xs text-muted font-regular">
                                            Paris, FR
                                        </span>
                                    </div>
                                    <div class="ms-auto">
                                        <i class="bi bi-chat"></i>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#" class="nav-link d-flex align-items-center">
                                    <div class="me-4">
                                        <div class="position-relative d-inline-block text-white">
                                            <span class="avatar bg-soft-warning text-warning rounded-circle">JW</span>
                                            <span class="position-absolute bottom-2 end-2 transform translate-x-1/2 translate-y-1/2 border-2 border-solid border-current w-3 h-3 bg-success rounded-circle"></span>
                                        </div>
                                    </div>
                                    <div>
                                        <span class="d-block text-sm font-semibold">
                                            Michael Jordan
                                        </span>
                                        <span class="d-block text-xs text-muted font-regular">
                                            Bucharest, RO
                                        </span>
                                    </div>
                                    <div class="ms-auto">
                                        <i class="bi bi-chat"></i>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#" class="nav-link d-flex align-items-center">
                                    <div class="me-4">
                                        <div class="position-relative d-inline-block text-white">
                                            <img alt="..." src="https://images.unsplash.com/photo-1610899922902-c471ae684eff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80" class="avatar rounded-circle" />
                                            <span class="position-absolute bottom-2 end-2 transform translate-x-1/2 translate-y-1/2 border-2 border-solid border-current w-3 h-3 bg-danger rounded-circle"></span>
                                        </div>
                                    </div>
                                    <div>
                                        <span class="d-block text-sm font-semibold">
                                            Heather Wright
                                        </span>
                                        <span class="d-block text-xs text-muted font-regular">
                                            London, UK
                                        </span>
                                    </div>
                                    <div class="ms-auto">
                                        <i class="bi bi-chat"></i>
                                    </div>
                                </a>
                            </li>
                        </ul>
                        <div class="mt-auto"></div>
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link" href="#">
                                    <i class="bi bi-person-square"></i> Account
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">
                                    <i class="bi bi-box-arrow-left"></i> Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Menu