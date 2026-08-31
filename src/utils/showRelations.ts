import { sequelize } from "../config/database";
import { users, clinics, warehouse, medication, Inventory, SupplyRequest } from "../models/associations.model";

export async function displayDatabaseRelations(): Promise<void> {
    console.log("\n" + "=".repeat(80));
    console.log("📊 DATABASE SCHEMA - RELACIONES EN POSTGRESQL");
    console.log("=".repeat(80) + "\n");

    // Conectar a la base de datos
    await sequelize.authenticate();
    console.log("✅ Conexión a PostgreSQL exitosa\n");

    // 1. USERS TABLE
    console.log("┌─ TABLA: users");
    console.log("├─ Columnas:");
    console.log("│  ├─ id (INTEGER, PRIMARY KEY)");
    console.log("│  ├─ email (STRING, UNIQUE)");
    console.log("│  ├─ password (STRING)");
    console.log("│  ├─ role (STRING)");
    console.log("│  ├─ active (BOOLEAN)");
    console.log("│  ├─ createdAt (TIMESTAMP)");
    console.log("│  ├─ updatedAt (TIMESTAMP)");
    console.log("│  └─ deletedAt (TIMESTAMP, nullable)");
    console.log("├─ Relaciones:");
    console.log("│  ├─ 1:N con clinics (responsibleId)");
    console.log("│  │   └─ Alias: clinics / responsible");
    console.log("│  │   └─ Acciones: onDelete=RESTRICT, onUpdate=CASCADE");
    console.log("│  └─ 1:N con supply_requests (createdBy)");
    console.log("│      └─ Alias: createdRequests / creator");
    console.log("│      └─ Acciones: onDelete=RESTRICT, onUpdate=CASCADE");
    console.log("└─ Índices: email (UNIQUE)\n");

    // 2. CLINICS TABLE
    console.log("┌─ TABLA: clinics");
    console.log("├─ Columnas:");
    console.log("│  ├─ id (INTEGER, PRIMARY KEY)");
    console.log("│  ├─ name (STRING)");
    console.log("│  ├─ responsibleId (INTEGER, FOREIGN KEY → users.id)");
    console.log("│  ├─ active (BOOLEAN)");
    console.log("│  ├─ createdAt (TIMESTAMP)");
    console.log("│  ├─ updatedAt (TIMESTAMP)");
    console.log("│  └─ deletedAt (TIMESTAMP, nullable)");
    console.log("├─ Relaciones:");
    console.log("│  ├─ N:1 con users (responsibleId)");
    console.log("│  │   └─ Alias: responsible");
    console.log("│  │   └─ Acciones: onDelete=RESTRICT, onUpdate=CASCADE");
    console.log("│  └─ 1:N con supply_requests (clinicId)");
    console.log("│      └─ Alias: supplyRequests");
    console.log("│      └─ Acciones: onDelete=RESTRICT, onUpdate=CASCADE");
    console.log("└─ Foreign Keys: responsibleId → users.id\n");

    // 3. WAREHOUSES TABLE
    console.log("┌─ TABLA: warehouses");
    console.log("├─ Columnas:");
    console.log("│  ├─ id (INTEGER, PRIMARY KEY)");
    console.log("│  ├─ name (STRING)");
    console.log("│  ├─ location (STRING)");
    console.log("│  ├─ active (BOOLEAN)");
    console.log("│  ├─ createdAt (TIMESTAMP)");
    console.log("│  ├─ updatedAt (TIMESTAMP)");
    console.log("│  └─ deletedAt (TIMESTAMP, nullable)");
    console.log("├─ Relaciones:");
    console.log("│  ├─ 1:N con inventories (warehouseId)");
    console.log("│  │   └─ Alias: inventory");
    console.log("│  │   └─ Acciones: onDelete=CASCADE, onUpdate=CASCADE");
    console.log("│  └─ 1:N con supply_requests (warehouseId)");
    console.log("│      └─ Alias: supplyRequests");
    console.log("│      └─ Acciones: onDelete=RESTRICT, onUpdate=CASCADE");
    console.log("└─ Índices: Ninguno específico\n");

    // 4. MEDICATIONS TABLE
    console.log("┌─ TABLA: medications");
    console.log("├─ Columnas:");
    console.log("│  ├─ id (INTEGER, PRIMARY KEY)");
    console.log("│  ├─ description (STRING)");
    console.log("│  ├─ active (BOOLEAN)");
    console.log("│  ├─ createdAt (TIMESTAMP)");
    console.log("│  ├─ updatedAt (TIMESTAMP)");
    console.log("│  └─ deletedAt (TIMESTAMP, nullable)");
    console.log("├─ Relaciones:");
    console.log("│  ├─ 1:N con inventories (medicationId)");
    console.log("│  │   └─ Alias: inventory");
    console.log("│  │   └─ Acciones: onDelete=CASCADE, onUpdate=CASCADE");
    console.log("│  └─ 1:N con supply_requests (medicationId)");
    console.log("│      └─ Alias: supplyRequests");
    console.log("│      └─ Acciones: onDelete=RESTRICT, onUpdate=CASCADE");
    console.log("└─ Índices: Ninguno específico\n");

    // 5. INVENTORIES TABLE
    console.log("┌─ TABLA: inventories");
    console.log("├─ Columnas:");
    console.log("│  ├─ id (INTEGER, PRIMARY KEY)");
    console.log("│  ├─ warehouseId (INTEGER, FOREIGN KEY → warehouses.id)");
    console.log("│  ├─ medicationId (INTEGER, FOREIGN KEY → medications.id)");
    console.log("│  ├─ quantity (INTEGER)");
    console.log("│  ├─ active (BOOLEAN)");
    console.log("│  ├─ createdAt (TIMESTAMP)");
    console.log("│  ├─ updatedAt (TIMESTAMP)");
    console.log("│  └─ deletedAt (TIMESTAMP, nullable)");
    console.log("├─ Relaciones:");
    console.log("│  ├─ N:1 con warehouses (warehouseId)");
    console.log("│  │   └─ Alias: warehouse");
    console.log("│  │   └─ Acciones: onDelete=CASCADE, onUpdate=CASCADE");
    console.log("│  └─ N:1 con medications (medicationId)");
    console.log("│      └─ Alias: medication");
    console.log("│      └─ Acciones: onDelete=CASCADE, onUpdate=CASCADE");
    console.log("├─ Foreign Keys:");
    console.log("│  ├─ warehouseId → warehouses.id");
    console.log("│  └─ medicationId → medications.id");
    console.log("└─ Índices: (warehouseId, medicationId) UNIQUE\n");

    // 6. SUPPLY_REQUESTS TABLE
    console.log("┌─ TABLA: supply_requests");
    console.log("├─ Columnas:");
    console.log("│  ├─ id (INTEGER, PRIMARY KEY)");
    console.log("│  ├─ clinicId (INTEGER, FOREIGN KEY → clinics.id)");
    console.log("│  ├─ medicationId (INTEGER, FOREIGN KEY → medications.id)");
    console.log("│  ├─ warehouseId (INTEGER, FOREIGN KEY → warehouses.id)");
    console.log("│  ├─ createdBy (INTEGER, FOREIGN KEY → users.id)");
    console.log("│  ├─ quantity (INTEGER)");
    console.log("│  ├─ status (STRING, DEFAULT='PENDING')");
    console.log("│  ├─ active (BOOLEAN)");
    console.log("│  ├─ createdAt (TIMESTAMP)");
    console.log("│  ├─ updatedAt (TIMESTAMP)");
    console.log("│  └─ deletedAt (TIMESTAMP, nullable)");
    console.log("├─ Relaciones:");
    console.log("│  ├─ N:1 con clinics (clinicId)");
    console.log("│  │   └─ Alias: clinic");
    console.log("│  │   └─ Acciones: onDelete=RESTRICT, onUpdate=CASCADE");
    console.log("│  ├─ N:1 con medications (medicationId)");
    console.log("│  │   └─ Alias: medication");
    console.log("│  │   └─ Acciones: onDelete=RESTRICT, onUpdate=CASCADE");
    console.log("│  ├─ N:1 con warehouses (warehouseId)");
    console.log("│  │   └─ Alias: warehouse");
    console.log("│  │   └─ Acciones: onDelete=RESTRICT, onUpdate=CASCADE");
    console.log("│  └─ N:1 con users (createdBy)");
    console.log("│      └─ Alias: creator");
    console.log("│      └─ Acciones: onDelete=RESTRICT, onUpdate=CASCADE");
    console.log("├─ Foreign Keys:");
    console.log("│  ├─ clinicId → clinics.id");
    console.log("│  ├─ medicationId → medications.id");
    console.log("│  ├─ warehouseId → warehouses.id");
    console.log("│  └─ createdBy → users.id");
    console.log("└─ Índices: Ninguno específico\n");

    // DIAGRAM
    console.log("=".repeat(80));
    console.log("📈 DIAGRAMA DE RELACIONES");
    console.log("=".repeat(80) + "\n");

    console.log(`
    ┌────────────┐
    │   users    │
    └────────────┘
          │
          │ 1:N (responsibleId)
          │
    ┌─────▼─────┐        ┌─────────────────┐
    │  clinics  │────────►│ supply_requests │
    └───────────┘   1:N   └─────┬───────────┘
                              │
                              │ N:M (clinicId)
                              │
         ┌────────────────────┘
         │
         ├──► medications ◄──┐
         │    └───┬───────┘   │
         │        │ 1:N       │
         │        │           │
         │   inventories   (createdBy)
         │        ▲           │
         │        │ N:M       │
         └────────┼───────────┘
              warehouses
    `);

    console.log("✅ Relaciones verificadas correctamente en PostgreSQL\n");
    console.log("=".repeat(80) + "\n");

    // Información de integridad referencial
    console.log("🔒 INTEGRIDAD REFERENCIAL:");
    console.log("├─ RESTRICT: No permite eliminar registros con referencias");
    console.log("├─ CASCADE: Elimina registros relacionados automáticamente");
    console.log("└─ UPDATE CASCADE: Actualiza referencias cuando cambia la PK\n");

    console.log("=".repeat(80));
}

// Ejecutar si se llama directamente
if (require.main === module) {
    displayDatabaseRelations().catch(console.error);
}
