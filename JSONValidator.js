import { Validator } from "jsonschema";

var v = new Validator();

function validateJSON(req, schema){
    const incomingSchema = req.body;
    const result = v.validate(incomingSchema, schema);
    console.log(result.valid);
    return result.valid;
}

function usersignupJV(req, res, next){
    const schema1 = {
        "id": "/signup",
        "type": "object",
        "properties" : {
        "Name": {"type": "string"},
        "Contact": {"type": "number"},
        "Username": {"type": "string"},
        "Password": {"type": "string"}
        },
        "required": ["Name", "Contact", "Username", "Password"]
    };
    const response = validateJSON(req, schema1);
    if(response === true){
        next();
    }
    else{
        res.status(403).send("Invalid Input Format");
    }
}

function usersigninJV(req, res, next){
    const schema2 = {      
        "id": "/signin",
        "type": "object",
        "properties" : {
        "Username": {"type": "string"},
        "Password": {"type": "string"}
        },
        "required": ["Username", "Password"]
    };
    const response = validateJSON(req, schema2);
    if(response === true){
        next();
    }
    else{
        res.status(403).send("Invalid Input Format");
    }
}

function modifyAnimalJV(req, res, next){
    const schema3 = {      
        "id": "/modify",
        "type": "object",
        "properties" : {
            "Animalid": {"type": "string"},
            "Name": {"type": "string"},
            "HealthCondition": {"type": "string"},
            "Status": {"type": "string"},
            "OtherInformation": {"type": "string"}
        },
        "required": ["Animalid", "Name", "HealthCondition", "Status", "OtherInformation"]
    };
    const response = validateJSON(req, schema3);
    if(response === true){
        next();
    }
    else{
        res.status(403).send("Invalid Input Format");
    }
}

function modifyGeofenceJV(req, res, next){
    const schema4 = {
        "id": "/modifyGeofence",
        "type": "object",
        "properties" : {
            "Animalid": {"type": "string"},
            "Center" : {"type": "number"},
            "Radius" : {"type": "number"}
        },
        "required": ["Animalid", "Center", "Radius"]
    };
    const response = validateJSON(req, schema4);
    if(response === true){
        next();
    }
    else{
        res.status(403).send("Invalid Input Format");
    }
}

function particularAnimalDetailJV(req, res, next){
    const schema5 = {
        "id": "/pad",
        "type": "object",
        "properties" : {
            "Animalid": {"type": "string"}
        },
        "required": ["Animalid"]
    };
    const response = validateJSON(req, schema5);
    if(response === true){
        next();
    }
    else{
        res.status(403).send("Invalid Input Format");
    }
}

function particularAnimalHistoryJV(req, res, next){
    const schema6 = {
        "id": "/modifyGeofence",
        "type": "object",
        "properties" : {
            "Animalid": {"type": "string"},
            "StartDate" : {"type": "date"},
            "EndDate" : {"type": "date"}
        },
        "required": ["Animalid", "StartDate", "EndDate"]
    };
    const response = validateJSON(req, schema6);
    if(response === true){
        next();
    }
    else{
        res.status(403).send("Invalid Input Format");
    }
}

export default {
    usersignupJV,
    usersigninJV,
    modifyAnimalJV,
    modifyGeofenceJV,
    particularAnimalDetailJV,
    particularAnimalHistoryJV
};