import { users } from "./user.model";
import { clinics } from "./clinic.model";
import { warehouse } from "./warehouse.model";
import { medication } from "./medication.model";
import { Inventory } from "./inventory.model";
import { SupplyRequest } from "./supply-request.model";

/*
|--------------------------------------------------------------------------
| USER - CLINIC
|--------------------------------------------------------------------------
*/

users.hasMany(clinics, {
    foreignKey: "responsibleId",
    as: "clinics"
});

clinics.belongsTo(users, {
    foreignKey: "responsibleId",
    as: "responsible"
});

/*
|--------------------------------------------------------------------------
| WAREHOUSE - INVENTORY
|--------------------------------------------------------------------------
*/

warehouse.hasMany(Inventory, {
    foreignKey: "warehouseId",
    as: "inventories"
});

Inventory.belongsTo(warehouse, {
    foreignKey: "warehouseId",
    as: "warehouse"
});

/*
|--------------------------------------------------------------------------
| MEDICATION - INVENTORY
|--------------------------------------------------------------------------
*/

medication.hasMany(Inventory, {
    foreignKey: "medicationId",
    as: "inventories"
});

Inventory.belongsTo(medication, {
    foreignKey: "medicationId",
    as: "medication"
});

/*
|--------------------------------------------------------------------------
| CLINIC - SUPPLY REQUEST
|--------------------------------------------------------------------------
*/

clinics.hasMany(SupplyRequest, {
    foreignKey: "clinicId",
    as: "supplyRequests"
});

SupplyRequest.belongsTo(clinics, {
    foreignKey: "clinicId",
    as: "clinic"
});

/*
|--------------------------------------------------------------------------
| MEDICATION - SUPPLY REQUEST
|--------------------------------------------------------------------------
*/

medication.hasMany(SupplyRequest, {
    foreignKey: "medicationId",
    as: "supplyRequests"
});

SupplyRequest.belongsTo(medication, {
    foreignKey: "medicationId",
    as: "medication"
});

/*
|--------------------------------------------------------------------------
| WAREHOUSE - SUPPLY REQUEST
|--------------------------------------------------------------------------
*/

warehouse.hasMany(SupplyRequest, {
    foreignKey: "warehouseId",
    as: "supplyRequests"
});

SupplyRequest.belongsTo(warehouse, {
    foreignKey: "warehouseId",
    as: "warehouse"
});

/*
|--------------------------------------------------------------------------
| USER - SUPPLY REQUEST
|--------------------------------------------------------------------------
*/

users.hasMany(SupplyRequest, {
    foreignKey: "createdBy",
    as: "createdRequests"
});

SupplyRequest.belongsTo(users, {
    foreignKey: "createdBy",
    as: "creator"
});

export {
    users,
    clinics,
    warehouse,
    medication,
    Inventory,
    SupplyRequest
};