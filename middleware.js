import express from "express";

export default function(app) {
    app.use('/', getSurflineForecast)
    
}