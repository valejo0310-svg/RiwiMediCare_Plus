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
    as: "clinics",
    onDelete: "RESTRICT",
    onUpdate: "CASCADE"
});

clinics.belongsTo(users, {
    foreignKey: "responsibleId",
    as: "responsible",
    onDelete: "RESTRICT",
    onUpdate: "CASCADE"
});

/*
|--------------------------------------------------------------------------
| WAREHOUSE - INVENTORY
|--------------------------------------------------------------------------
*/

warehouse.hasMany(Inventory, {
    foreignKey: "warehouseId",
    as: "inventories",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

Inventory.belongsTo(warehouse, {
    foreignKey: "warehouseId",
    as: "warehouse",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

/*
|--------------------------------------------------------------------------
| MEDICATION - INVENTORY
|--------------------------------------------------------------------------
*/

medication.hasMany(Inventory, {
    foreignKey: "medicationId",
    as: "inventories",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

Inventory.belongsTo(medication, {
    foreignKey: "medicationId",
    as: "medication",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

/*
|--------------------------------------------------------------------------
| CLINIC - SUPPLY REQUEST
|--------------------------------------------------------------------------
*/

clinics.hasMany(SupplyRequest, {
    foreignKey: "clinicId",
    as: "supplyRequests",
    onDelete: "RESTRICT",
    onUpdate: "CASCADE"
});

SupplyRequest.belongsTo(clinics, {
    foreignKey: "clinicId",
    as: "clinic",
    onDelete: "RESTRICT",
    onUpdate: "CASCADE"
});

/*
|--------------------------------------------------------------------------
| MEDICATION - SUPPLY REQUEST
|--------------------------------------------------------------------------
*/

medication.hasMany(SupplyRequest, {
    foreignKey: "medicationId",
    as: "supplyRequests",
    onDelete: "RESTRICT",
    onUpdate: "CASCADE"
});

SupplyRequest.belongsTo(medication, {
    foreignKey: "medicationId",
    as: "medication",
    onDelete: "RESTRICT",
    onUpdate: "CASCADE"
});

/*
|--------------------------------------------------------------------------
| WAREHOUSE - SUPPLY REQUEST
|--------------------------------------------------------------------------
*/

warehouse.hasMany(SupplyRequest, {
    foreignKey: "warehouseId",
    as: "supplyRequests",
    onDelete: "RESTRICT",
    onUpdate: "CASCADE"
});

SupplyRequest.belongsTo(warehouse, {
    foreignKey: "warehouseId",
    as: "warehouse",
    onDelete: "RESTRICT",
    onUpdate: "CASCADE"
});

/*
|--------------------------------------------------------------------------
| USER - SUPPLY REQUEST
|--------------------------------------------------------------------------
*/

users.hasMany(SupplyRequest, {
    foreignKey: "createdBy",
    as: "createdRequests",
    onDelete: "RESTRICT",
    onUpdate: "CASCADE"
});

SupplyRequest.belongsTo(users, {
    foreignKey: "createdBy",
    as: "creator",
    onDelete: "RESTRICT",
    onUpdate: "CASCADE"
});

export {
    users,
    clinics,
    warehouse,
    medication,
    Inventory,
    SupplyRequest
};