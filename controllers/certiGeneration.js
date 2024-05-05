const Certificate = require("../models/Certificate")
const { google } = require('googleapis');
const fs = require('fs');
const key = require('../apikey.json');

exports.getAllCertificates = async (req, res) => {
    try {
        const certificates = await Certificate.find();
        res.status(200).json({
            success: true,
            message: "All certificates retreived",
            certificates
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: true,
            message: error.message
        })
    }
}

exports.getSpecifiedCertificate = async (req, res) => {
    try {
        const { id } = req.params;
        const certificate = await Certificate.findById(id);
        if (certificate == null) {
            return res.status(404).json({
                success: false,
                message: "Cannot find certificate"
            })
        }

        res.status(200).json({
            success: true,
            message: "Certificate retreived",
            certificate
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}



exports.certificateGenerate = async (req, res) => {
    try {
        console.log("API called");
        
        const { name, course, email, date, certificateId } = req.body;
        const dateOfApproval = new Date(date);
        const file = req.file; 
        console.log(req.body)
        console.log(req.file)

        if (!name || !course || !email || !file) {
            return res.status(400).json({ success: false, message: "Enter all the details" });
        }

        const jwtClient = new google.auth.JWT(
            key.client_email,
            null,
            key.private_key,
            ['https://www.googleapis.com/auth/drive']
        );

        await jwtClient.authorize();

        const drive = google.drive({ version: 'v3', auth: jwtClient });
        var fileMetadata = {
            name: file.originalname,
            parents: ['1VQZx_vjq692QMtCCA0qo2B_4k2jFHct-']
        };
        var media = {
            mimeType: file.mimetype,
            body: fs.createReadStream(file.path)
        };

        const response = await drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id, webViewLink, webContentLink'
        });

        console.log('File Id: ', response.data.id);
        console.log('File View Link: ', response.data.webViewLink);
        console.log('File Download Link: ', response.data.webContentLink);

        const newCertificate = new Certificate({
            name,
            course,
            dateOfApproval,
            email,
            certificateId,
            certificateLink: response.data.webViewLink 
        });

        await newCertificate.save();

        return res.status(201).json({ success: true, message: "Certificate created successfully", newCertificate });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};