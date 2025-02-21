import React, { useEffect, useState } from 'react'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import axios from 'axios'
import Menu from '../Header/menu';
import Header from '../Header/header';


const Service = () => {
    const [service, setService] = useState([]);
    const [serviceName, setServiceName] = useState("");
    const [serviceDes, setServiceDes] = useState("");
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [serviceId, setServiceId] = useState(null); // Add this state

    const [serviceImage, setServiceImage] = useState([]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files); // Convert FileList to Array
        const validImages = files.filter(file => file.type.startsWith("image/"));

        if (validImages.length > 0) {
            setServiceImage(validImages); // Replace the old images with new ones
        } else {
            alert("Please select a valid image file (JPG, PNG, GIF, etc.).");
        }
    };


    const removeFile = (index) => {
        setServiceImage(serviceImage.filter((_, i) => i !== index));
    };

    const handleEdit = (venue) => {
        setServiceId(venue.id); // Store ID for update API call
        setServiceName(venue.serviceName);
        setServiceDes(venue.serviceDes);
        setServiceImage(Array.isArray(venue.serviceImage) ? venue.serviceImage : [venue.serviceImage]);

        setShowModal(true); // Open modal
    };

    const clearVal = () => {
        setServiceId('')
        setServiceName('')
        setServiceDes('')
        setServiceImage('')
    }
    const getPhotographerData = () => {
        axios.get('http://localhost:3000/api/v1/service/get')
            .then(response => {
                setService(response.data); // Update state with API response
            })
            .catch(error => {
                console.error('Error fetching service:', error);
            });
    }
    useEffect(() => {
        getPhotographerData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("serviceName", serviceName);

        formData.append("serviceDes", serviceDes);
        // formData.append("serviceImage", serviceImage || "");
        serviceImage.forEach((image, index) => {
            formData.append(`serviceImage`, image); // Multiple files support
        });
        try {

            setLoading(true);

            const res = await axios.post("http://localhost:3000/api/v1/service/create", formData);
            if (res.status === 201) {

                getPhotographerData();
                setServiceName("")
                setServiceImage('');
                setServiceDes("")
                setShowModal(false)
            } else {
                console.error('Error: Photographer creation failed');
            }
        } catch (error) {
            console.error("API Error:", error);
            alert("Something went wrong! Please try again.");
        } finally {
            setLoading(false);
        }

    };
    const deletePhotographer = async (id) => {

        try {
            setLoading(true);
            const res = await axios.delete(`http://localhost:3000/api/v1/service/delete/${id}`);

            if (res.status === 200) {
                getPhotographerData(); // Refresh list after deletion
            }
        } catch (error) {
            console.error("Error deleting photographer:", error);
            alert("Error while deleting photographer. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const updateVenueData = async (id) => {
        const formData = new FormData();
        formData.append("serviceName", serviceName);
        formData.append("serviceDes", serviceDes);

        serviceImage.forEach((image) => {
            if (typeof image !== 'string') {  // Only append if it's a new file
                formData.append(`serviceImage`, image);
            }
        });
        try {
            setLoading(true);
            const res = await axios.put(`http://localhost:3000/api/v1/service/update/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (res.status === 200) {
                getPhotographerData(); // Refresh list
                setShowModal(false);
            } else {
                console.error('Error: Venue update failed');
            }
        } catch (error) {
            console.error("API Error:", error);
            alert("Something went wrong! Please try again.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <Header />
            <div class="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
                <Menu />
                <div class="h-screen flex-grow-1 overflow-y-lg-auto dash_scroll">
                    <header class="bg-surface-primary border-bottom pt-6 pb-6">
                        <div class="container-fluid">
                            <div class="mb-npx">
                                <div class="row align-items-center">
                                    <div class="col-sm-6 col-12 mb-4 mb-sm-0">
                                        <h1 class="h2 mb-0 ls-tight">service</h1>
                                    </div>
                                    <div class="col-sm-6 col-12 text-sm-end">
                                        <div class="mx-n1">
                                            {/* <a href="#" class="btn d-inline-flex btn-sm btn-neutral border-base mx-1">
                                                <span class=" pe-2">
                                                    <i class="bi bi-pencil"></i>
                                                </span>
                                                <span>Edit</span>
                                            </a> */}

                                            <button
                                                className="btn d-inline-flex btn-sm button_primary mx-1"
                                                onClick={() => setShowModal(true)}
                                            >
                                                <span className="pe-2">
                                                    <i className="bi bi-plus"></i>
                                                </span>
                                                <span>Create</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </header>
                    <main class="py-6 bg-surface-secondary">
                        <div class="container-fluid">

                            <div class="card shadow border-0 mb-7">
                                <div class="card-header">
                                    <h5 class="mb-0">Service</h5>
                                </div>
                                <div class="table-responsive">
                                    <table class="table table-hover table-nowrap">
                                        <thead class="thead-light">
                                            <tr>
                                                <th scope="col">Name</th>
                                                <th scope="col">Description</th>
                                                <th scope="col">Image</th>
                                                <th>Action</th>
                                                <th></th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {service.length > 0 ? ( 
                                                service.map((photographer, index) => (
                                                    <tr key={index}>
                                                        <td>{photographer.serviceName}</td>
                                                        <td>{photographer.serviceDes}</td>
                                                        <td className="text-truncate" style={{ maxWidth: "150px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{photographer.serviceImage}</td>
                                                        <td>
                                                            {/* <button className="btn btn-sm btn-neutral">View</button> */}
                                                            <button className="btn btn-sm btn-neutral" onClick={() => handleEdit(photographer)}>  <span class=" pe-2">
                                                                <i class="bi bi-pencil"></i>
                                                            </span>
                                                                <span>Edit</span></button>
                                                            {/* <button className="btn btn-sm btn-neutral" onClick={() => handleEdit(photographer)}>View</button> */}
                                                            <button className="btn btn-sm btn-danger ms-2" onClick={() => deletePhotographer(photographer.id)}>Delete</button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="9" className="text-center">
                                                        No service found.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <div class="card-footer border-0 py-5">
                                    <span class="text-muted text-sm">Showing 10 items out of 250 results found</span>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Create Venue</h4>
                                <button type="button" className="btn-close" onClick={() => { setShowModal(false); clearVal() }}></button>
                            </div>
                            <div className="modal-body">
                                <div className='d-flex justify-content-between gap-2'>
                                    <button className='button_primary p-3 rounded-10 d-flex gap-4 justify-content-center align-items-center' style={{ width: '100%' }}><FontAwesomeIcon icon={faEnvelope} /> Send Message</button>
                                    <button className='button_primary_contect p-3 rounded-10 d-flex gap-4 justify-content-center align-items-center' style={{ width: '100%' }}><FontAwesomeIcon icon={faPhone} />View Contact</button>
                                </div>

                                <form className="mt-5">
                                    <div className="d-flex gap-3">
                                        <div style={{ width: '100%' }}>
                                            <input type="text" className="form-control" placeholder="Name" style={{ width: "100%" }} value={serviceName}
                                                onChange={(e) => setServiceName(e.target.value)} />
                                        </div>

                                    </div>
                                    {/* </div> */}

                                    <div className="d-flex gap-3 mt-4">
                                        <div style={{ width: '100%' }}>
                                            <textarea type="text" className="form-control" placeholder="Description" style={{ width: "100%" }} value={serviceDes}
                                                onChange={(e) => setServiceDes(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="d-flex flex-column gap-3 mt-4">
                                        {/* Upload Box */}
                                        <div className="border rounded-3 p-4 text-center w-100"
                                            style={{ border: "2px dashed #ccc", background: "#f8f9fa", cursor: "pointer" }}
                                        >
                                            <label htmlFor="mediaInput" className="d-block">
                                                <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                                                    Click to Upload an Image
                                                </span>
                                                <br />
                                                <span style={{ color: "#6c757d" }}>Only image files allowed (JPG, PNG, etc.)</span>
                                            </label>
                                            <input
                                                type="file"
                                                id="mediaInput"
                                                className="d-none"
                                                accept="image/*"
                                                multiple // Allow multiple files
                                                onChange={handleFileChange}
                                            />
                                        </div>

                                        {/* Preview Section */}
                                        {/* {serviceImage.length > 0 && (
                                            <div className="mt-3 d-flex flex-wrap gap-3">
                                                {serviceImage.map((image, index) => (
                                                    <div className="position-relative" key={index}>
                                                        <img
                                                            src={URL.createObjectURL(image)}
                                                            alt="Uploaded"
                                                            className="img-fluid rounded"
                                                            style={{ width: "120px", height: "120px", objectFit: "cover" }}
                                                        />
                                                        <button
                                                            onClick={() => removeFile(index)}
                                                            className="btn btn-danger btn-sm position-absolute"
                                                            style={{ top: "5px", right: "5px" }}
                                                        >
                                                            X
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )} */}
                                        {/* Preview Section */}
                                        {serviceImage.length > 0 && (
                                            <div className="mt-3 d-flex flex-wrap gap-3">
                                                {serviceImage.map((image, index) => (
                                                    <div className="position-relative" key={index}>
                                                        <img
                                                            src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                                                            alt="Uploaded"
                                                            className="img-fluid rounded"
                                                            style={{ width: "120px", height: "120px", objectFit: "cover" }}
                                                        />
                                                        <button
                                                            onClick={() => removeFile(index)}
                                                            className="btn btn-danger btn-sm position-absolute"
                                                            style={{ top: "5px", right: "5px" }}
                                                        >
                                                            X
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                    </div>
                                    <div class='mt-5'>
                                        <button
                                            className="btn button_primary mt-5 mb-5"
                                            style={{ width: '100%' }}
                                            onClick={serviceId ? () => updateVenueData(serviceId) : handleSubmit}
                                        >
                                            {serviceId ? "Update Venue" : "Check Availability & Prices"}
                                        </button>

                                        {/* <button className="btn button_primary mt-5 mb-5" style={{ width: '100%' }} onClick={handleSubmit}>Check Availability & Prices</button> */}
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div >
                </div >
            )}
        </>
    )
}

export default Service