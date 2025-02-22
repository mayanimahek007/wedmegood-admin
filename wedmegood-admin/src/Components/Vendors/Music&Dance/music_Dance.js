import React, { useEffect, useRef, useState } from 'react'
import '../Photographer/photographer.css'
import Header from '../../Header/header'
import Menu from '../../Header/menu'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import { RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';
import axios from 'axios'


const MusicDance = () => {
  const [photographers, setPhotographers] = useState([]);
  const [photographerName, setPhotographerName] = useState("");
  const [photographerPriceInfo, setPhotographerPriceInfo] = useState("");
  const [photographerPrice, setPhotographerPrice] = useState("");
  const [photographerNumber, setPhotographerNumber] = useState("");
  const [photographerDetails, setPhotographerDetails] = useState("");
  const [photographerEmail, setPhotographerEmail] = useState("");
  const [photographerDate, setPhotographerDate] = useState("");
  const [photographerMedia, setPhotographerMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [serviceId, setServiceId] = useState(null); // Add this state

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to Array
    // const validImages = files.filter(file => file.type.startsWith("image/"));

    if (files.length > 0) {
      setPhotographerMedia(files); // Replace the old images with new ones
    } else {
      alert("Please select a valid image file (JPG, PNG, GIF, etc.).");
    }
  };


  const removeFile = (index) => {
    setPhotographerMedia(photographerMedia.filter((_, i) => i !== index));
  };

  const getPhotographerData = () => {
    axios.get('http://localhost:3000/api/v1/music/get')
      .then(response => {
        setPhotographers(response.data); // Update state with API response
      })
      .catch(error => {
        console.error('Error fetching photographers:', error);
      });
  }
  useEffect(() => {
    getPhotographerData();
  }, []);

  const addPhoto = async () => {
    const formData = new FormData();
    formData.append("musicName", photographerName);
    formData.append("musicPriceInfo", photographerPriceInfo);
    formData.append("musicPrice", photographerPrice);
    formData.append("musicNumber", photographerNumber);
    formData.append("musicDetails", photographerDetails);
    formData.append("musicEmail", photographerEmail);
    formData.append("musicDate", photographerDate);

    photographerMedia.forEach((image, index) => {
      formData.append(`musicMedia`, image); // Multiple files support
    });

    try {
      setLoading(true); // ✅ Loading state ON
      const res = await axios.post("http://localhost:3000/api/v1/music/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Check if the response status is successful (e.g., 200 or 201)
      if (res.status === 201) {

        getPhotographerData();

        setPhotographerName("");
        setPhotographerPriceInfo("");
        setPhotographerPrice("");
        setPhotographerNumber("");
        setPhotographerDetails("");
        setPhotographerEmail("");
        setPhotographerDate("");
        setPhotographerMedia([]);
        setShowModal(false)
      } else {
        // Handle other statuses if necessary
        console.error('Error: Photographer creation failed');
      }
    } catch (error) {
      console.error("Error adding photographer:", error);
      alert("Error while adding photographer. Please try again.");
    } finally {
      setLoading(false); // ✅ Loading state OFF
    }
  };

  const handleEdit = (venue) => {
    setServiceId(venue.id); // Store ID for update API call
    setPhotographerName(venue.musicName);
    setPhotographerPriceInfo(venue.musicPriceInfo);
    setPhotographerPrice(venue.musicPrice);
    setPhotographerNumber(venue.musicNumber);
    setPhotographerDetails(venue.musicDetails);
    setPhotographerEmail(venue.musicEmail);
    setPhotographerDate(venue.musicDate);
    setPhotographerMedia(Array.isArray(venue.musicMedia) ? venue.musicMedia : [venue.musicMedia]);

    setShowModal(true); // Open modal
  };

  const clearVal = () => {
    setServiceId('')
    setPhotographerName('')
    setPhotographerPriceInfo('')
    setPhotographerPrice('')
    setPhotographerNumber('')
    setPhotographerDetails('')
    setPhotographerEmail('')
    setPhotographerDate('')
    setPhotographerMedia('')
  }

  const deletePhotographer = async (id) => {

    try {
      setLoading(true);
      const res = await axios.delete(`http://localhost:3000/api/v1/music/delete/${id}`);

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
    formData.append("musicName", photographerName);
    formData.append("musicPriceInfo", photographerPriceInfo);
    formData.append("musicPrice", photographerPrice);
    formData.append("musicNumber", photographerNumber);
    formData.append("musicDetails", photographerDetails);
    formData.append("musicEmail", photographerEmail);
    formData.append("musicDate", photographerDate);



    photographerMedia.forEach((image) => {
      if (typeof image !== 'string') {  // Only append if it's a new file
        formData.append(`musicMedia`, image);
      }
    });
    try {
      setLoading(true);
      const res = await axios.put(`http://localhost:3000/api/v1/music/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200) {
        getPhotographerData();
        clearVal()
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
                    <h1 class="h2 mb-0 ls-tight">Music & Dance</h1>
                  </div>
                  <div class="col-sm-6 col-12 text-sm-end">
                    <div class="mx-n1">
                      {/* <a href="#" class="btn d-inline-flex btn-sm btn-neutral border-base mx-1">
                        <span class=" pe-2">
                          <i class="bi bi-pencil"></i>
                        </span>
                        <span>Edit</span>
                      </a> */}
                      {/* <a href="#" class="btn d-inline-flex btn-sm btn-primary mx-1">
                        <span class=" pe-2">
                          <i class="bi bi-plus"></i>
                        </span>
                        <span>Create</span>
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
                  <h5 class="mb-0">Music & Dance</h5>
                </div>
                <div class="table-responsive">
                  <table class="table table-hover table-nowrap">
                    <thead class="thead-light">
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Date</th>
                        <th scope="col">Email</th>
                        <th scope="col">Number</th>
                        <th scope="col">Prices</th>
                        <th scope="col">Price Info</th>
                        <th scope="col">Wedding Details</th>
                        <th scope="col">Photos & Video</th>
                        <th></th>
                      </tr>
                    </thead>

                    <tbody>
                      {photographers.length > 0 ? (
                        photographers.map((photographer, index) => (
                          <tr key={index}>
                            <td>{photographer.musicName}</td>
                            <td>{new Date(photographer.musicDate).toLocaleDateString()}</td>
                            <td>{photographer.musicEmail}</td>
                            <td>{photographer.musicNumber}</td>
                            <td>${photographer.musicPrice}</td>
                            <td>{photographer.musicPriceInfo}</td>
                            <td>{photographer.musicDetails}</td>
                            <td className="text-truncate" style={{ maxWidth: "150px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{photographer.musicMedia}</td>
                            <td>
                              <button className="btn btn-sm btn-neutral" onClick={() => handleEdit(photographer)}>  <span class=" pe-2">
                                <i class="bi bi-pencil"></i>
                              </span>
                                <span>Edit</span></button>
                              <button className="btn btn-sm btn-danger ms-2" onClick={() => deletePhotographer(photographer.id)}>Delete</button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="9" className="text-center">
                            No photographers found.
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
                <h4 className="modal-title">Create Music & Dance</h4>
                <button type="button" className="btn-close" onClick={() => {
                  setShowModal(false);
                  clearVal()
                }}></button>
              </div>
              <div className="modal-body">
                <div className='d-flex justify-content-between gap-2'>
                  <button className='button_primary p-3 rounded-10 d-flex gap-4 justify-content-center align-items-center' style={{ width: '100%' }}><FontAwesomeIcon icon={faEnvelope} /> Send Message</button>
                  <button className='button_primary_contect p-3 rounded-10 d-flex gap-4 justify-content-center align-items-center' style={{ width: '100%' }}><FontAwesomeIcon icon={faPhone} />View Contact</button>
                </div>
                <div className="mt-5">
                  <div className="d-flex gap-3">
                    <div style={{ width: '100%' }}>
                      <input type="text" className="form-control" placeholder="Name" style={{ width: "100%" }} value={photographerName}
                        onChange={(e) => setPhotographerName(e.target.value)} />
                    </div>
                    {/* <div style={{ width: '100%' }}> */}

                    <PhoneInput
                      country={'in'} // Default India
                      enableSearch={true} // Search feature in dropdown
                      value={photographerNumber}
                      onChange={(value) => setPhotographerNumber(value)} // Remove `.target.value`
                      className="mt-4"
                      inputStyle={{
                        background: 'transparent',
                        borderLeft: 0,
                        borderRight: 0,
                        width: '100%',
                        borderTop: 0,
                        borderRadius: 0,
                        height: '30px'
                      }}
                    />

                  </div>
                  {/* </div> */}

                  <div className="d-flex gap-3 mt-4">
                    <div style={{ width: '100%' }}>
                      <input type="email" className="form-control" placeholder="Email" style={{ width: "100%" }} value={photographerEmail}
                        onChange={(e) => setPhotographerEmail(e.target.value)} />

                    </div>
                    <div style={{ width: '100%' }}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          label="Function Date"
                          value={photographerDate}
                          onChange={(newDate) => setPhotographerDate(newDate)} // 🔥 Direct date pass karvu
                          renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                      </LocalizationProvider>
                    </div>

                  </div>

                  <div className="d-flex gap-3 mt-4">
                    <input type="number" className="form-control" placeholder="Price" style={{ width: "100%" }} value={photographerPrice}
                      onChange={(e) => setPhotographerPrice(e.target.value)} />
                    <input type="text" className="form-control" placeholder="Price Info" style={{ width: "100%" }} value={photographerPriceInfo}
                      onChange={(e) => setPhotographerPriceInfo(e.target.value)} />

                  </div>
                  <div className="d-flex gap-3 mt-4">
                    <textarea type="text" className="form-control" placeholder="Details about my wedding" style={{ width: "100%" }} value={photographerDetails}
                      onChange={(e) => setPhotographerDetails(e.target.value)} />

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
                        accept="image/*,video/*"
                        multiple // Allow multiple files
                        onChange={handleFileChange}
                      />
                    </div>

                    {photographerMedia.length > 0 && (
                      <div className="mt-3 d-flex flex-wrap gap-3">
                        {photographerMedia.map((image, index) => (
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
                    <div class='mt-5'>
                      <button
                        className="btn button_primary mt-5 mb-5"
                        style={{ width: '100%' }}
                        onClick={serviceId ? () => updateVenueData(serviceId) : addPhoto}
                      >
                        {serviceId ? "Update Venue" : "Check Availability & Prices"}
                      </button>
                      {/* <button className="btn button_primary mt-5 mb-5" style={{ width: '100%' }} onClick={addPhoto}>Check Availability & Prices</button> */}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MusicDance