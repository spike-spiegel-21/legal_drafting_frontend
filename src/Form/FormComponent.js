import React, { useState } from 'react';
import axios from 'axios';
import '../Form/formStyle.css';
const FormComponent = () => {
  const [downloadUrl, setDownloadUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name_of_company: 'amazon',
    name_of_entity: 'Mr. Jeff Bezos',
    address_of_entity: '6th & 7th Floor, Ambience Corporate Office Tower-II, Ambience Tower, Ambience Island, Sector 24, Gurugram, Haryana 122002',
    date_of_rec: '16/02/2024',
    amount_of_rec: '5000',
    defect_des: 'I have taken the cultfit play pass member ship which charged me around 10000 rs for 3 months. In this memebership I was allowed to play in any of their play centers. At the time of memebership I was using their service for sector 23 which have 3 facaliteis of sports (incl. Badminton, Table Tennis and Lawn Tennis) After having there for around 3 weeks they are shutting down this place due to some reason. When I sad them for the refund the remaining amount they said you can use the service that is available in othr centere which is very far from my current residence. They said that the amound is not refundable.',
    amount_to_get: '5000',
    contact_of_user: '+91-888-888-xxxx',
    email_of_user: 'mayanksolanki2023@gmail.com',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const response = await axios.post('http://localhost:5000/process_json_data', formData, {
        responseType: 'blob',
      });
      const  downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      setDownloadUrl(downloadUrl);
      setLoading(false);
      console.log('POST request successful:', response.data);
    } catch (error) {   
      console.error('Error making POST request:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
      {/* Add input fields for each property */}
      <label>Name of Company:</label>
      <input type="text" name="name_of_company" value={formData.name_of_company} onChange={handleInputChange} required />

      {/* Add other input fields similarly */}
        <label>Name of Entity:</label>
        <input type="text" name="name_of_entity" value={formData.name_of_entity} onChange={handleInputChange} required />

        <label>Address of Entity:</label>
        <input type="text" name="address_of_entity" value={formData.address_of_entity} onChange={handleInputChange} required />

        <label>Date of Recipt:</label>
        <input type="text" name="date_of_rec" value={formData.date_of_rec} onChange={handleInputChange} required />

        <label>Amount of Recipt:</label>
        <input type="text" name="amount_of_rec" value={formData.amount_of_rec} onChange={handleInputChange} required />

        <label>Defect Description:</label>
        <textarea type="text" name="defect_des" value={formData.defect_des} onChange={handleInputChange} style={{resize: 'none', overflowX:'auto',whiteSpace: 'nowrap' }} rows="5" cols="30" required />

        <label>Amount to Get:</label>
        <input type="text" name="amount_to_get" value={formData.amount_to_get} onChange={handleInputChange} required />

        <label>Contact of User:</label>
        <input type="text" name="contact_of_user" value={formData.contact_of_user} onChange={handleInputChange} required />

        <label>Email of User:</label>
        <input type="text" name="email_of_user" value={formData.email_of_user} onChange={handleInputChange} required />

      <button disabled = {loading}type="submit">Submit</button>
    </form>
    {downloadUrl && !loading && <a href={downloadUrl} download="legal_notice.docx" disabled={true}>Download</a>}
    </div>
    
  );
};

export default FormComponent;
