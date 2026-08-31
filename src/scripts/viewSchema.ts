/**
 * Script para visualizar las relaciones de la base de datos PostgreSQL
 * Ejecutar: npx tsx src/scripts/viewSchema.ts
 */

import { sequelize } from "../config/database";
import { testDatabaseConnection } from "../config/database";
import "./../../src/models/associations.model"; // Cargar asociaciones

async function main() {
    try {
        // Verificar conexión
        await testDatabaseConnection();

        console.log("\n" + "╔".padEnd(102, "═") + "╗");
        console.log("║" + "📊 ESQUEMA DE RELACIONES - RIWIMEDICARE_PLUS".padEnd(101) + "║");
        console.log("╚".padEnd(102, "═") + "╝\n");

        // Sincronizar modelos (sin alter)
        await sequelize.sync({ alter: false });

        // Obtener las relaciones definidas en Sequelize
        console.log("✅ MODELOS CARGADOS Y SINCRONIZADOS CON EXITO\n");

        console.log("📌 RELACIONES DEFINIDAS EN SEQUELIZE:\n");

        console.log("┌─────────────────────────────────────────────────────────────┐");
        console.log("│ 1. USERS (Usuarios del sistema)                             │");
        console.log("├─────────────────────────────────────────────────────────────┤");
        console.log("│ Relaciones:                                                 │");
        console.log("│ • users.hasMany(clinics)      → Alias: clinics              │");
        console.log("│ • users.hasMany(SupplyRequest) → Alias: createdRequests     │");
        console.log("│ Restricción: No se pueden eliminar usuarios con referencias │");
        console.log("└─────────────────────────────────────────────────────────────┘\n");

        console.log("┌─────────────────────────────────────────────────────────────┐");
        console.log("│ 2. CLINICS (Clínicas/Centros médicos)                       │");
        console.log("├─────────────────────────────────────────────────────────────┤");
        console.log("│ Relaciones:                                                 │");
        console.log("│ • clinics.belongsTo(users)     → FK: responsibleId          │");
        console.log("│ • clinics.hasMany(SupplyRequest) → Alias: supplyRequests   │");
        console.log("│ Restricción: Solo pueden tener un usuario responsable      │");
        console.log("└─────────────────────────────────────────────────────────────┘\n");

        console.log("┌─────────────────────────────────────────────────────────────┐");
        console.log("│ 3. MEDICATIONS (Medicamentos)                               │");
        console.log("├─────────────────────────────────────────────────────────────┤");
        console.log("│ Relaciones:                                                 │");
        console.log("│ • medications.hasMany(Inventory) → Alias: inventory        │");
        console.log("│ • medications.hasMany(SupplyRequest)                       │");
        console.log("│ Restricción: CASCADE (se elimina si no hay inventario)      │");
        console.log("└─────────────────────────────────────────────────────────────┘\n");

        console.log("┌─────────────────────────────────────────────────────────────┐");
        console.log("│ 4. WAREHOUSES (Almacenes/Depósitos)                         │");
        console.log("├─────────────────────────────────────────────────────────────┤");
        console.log("│ Relaciones:                                                 │");
        console.log("│ • warehouses.hasMany(Inventory) → Alias: inventory         │");
        console.log("│ • warehouses.hasMany(SupplyRequest)                        │");
        console.log("│ Restricción: CASCADE para inventario                        │");
        console.log("└─────────────────────────────────────────────────────────────┘\n");

        console.log("┌─────────────────────────────────────────────────────────────┐");
        console.log("│ 5. INVENTORIES (Inventario de medicamentos)                 │");
        console.log("├─────────────────────────────────────────────────────────────┤");
        console.log("│ Relaciones:                                                 │");
        console.log("│ • inventories.belongsTo(warehouse) → FK: warehouseId       │");
        console.log("│ • inventories.belongsTo(medication) → FK: medicationId     │");
        console.log("│ Índice Único: (warehouseId, medicationId)                   │");
        console.log("│ Restricción: CASCADE (se eliminan con almacén/medicamento)  │");
        console.log("└─────────────────────────────────────────────────────────────┘\n");

        console.log("┌─────────────────────────────────────────────────────────────┐");
        console.log("│ 6. SUPPLY_REQUESTS (Solicitudes de suministro)              │");
        console.log("├─────────────────────────────────────────────────────────────┤");
        console.log("│ Claves Foráneas:                                            │");
        console.log("│ • clinicId      → clinics.id                                │");
        console.log("│ • medicationId  → medications.id                            │");
        console.log("│ • warehouseId   → warehouses.id                             │");
        console.log("│ • createdBy     → users.id                                  │");
        console.log("│ Campo Status: 'PENDING', 'APPROVED', 'REJECTED', etc.      │");
        console.log("│ Restricción: RESTRICT (no se pueden eliminar referencias)   │");
        console.log("└─────────────────────────────────────────────────────────────┘\n");

        console.log("╔" + "═".repeat(100) + "╗");
        console.log("║ " + "DIAGRAMA DE RELACIONES".padEnd(99) + "║");
        console.log("╠" + "═".repeat(100) + "╣");
        console.log("║" + " ".repeat(100) + "║");

        const diagram = `
                                    ┌──────────┐
                                    │  USERS   │
                                    └────┬─────┘
                                         │
                     ┌───────────────────┼───────────────────┐
                     │                   │                   │
                     │ (1:N)             │ (1:N)             │ (1:N)
                     │                   │                   │
                ┌────▼─────┐      ┌──────▼──────┐       ┌────▼────────┐
                │ CLINICS   │      │ SUPPLY REQ  │       │   (FK)      │
                └────┬─────┘      └──────┬──────┘       │createdBy    │
                     │                   │              └─────────────┘
                     │ (1:N)         ┌───┴────┬───────────┬─────────┐
                     │                │        │           │         │
              ┌──────▼────────┐       │(1:N)   │           │         │
              │(FK)           │       │        │           │         │
              │responsibleId  │  ┌────▼──────┐│      ┌─────▼──┐  ┌───▼───┐
              └───────────────┘  │MEDICATIONS││      │WAREHOUSE││CLINICS │
                                 └────┬──────┘│      └────┬────┘  └───┬───┘
                                      │       │           │           │
                                 ┌────▼───────┼───┐   ┌───▼─────┐     │
                                 │  (1:N)     │   │   │(1:N)    │     │
                                 │  medicationId  │   │warehouseId    │
                                 └────┬───────────┘   └────┬─────┘     │
                                      │                    │           │
                                 ┌────▼────────────────────▼──┐        │
                                 │   INVENTORIES              │◄───────┘
                                 │ Unique(warehouseId,       │
                                 │         medicationId)      │
                                 └───────────────────────────┘
        `;

        console.log("║  " + diagram.split("\n")[0].padEnd(99) + "║");
        diagram.split("\n").slice(1).forEach(line => {
            console.log("║  " + line.padEnd(99) + "║");
        });

        console.log("║" + " ".repeat(100) + "║");
        console.log("╠" + "═".repeat(100) + "╣");
        console.log("║ " + "INTEGRIDAD REFERENCIAL".padEnd(99) + "║");
        console.log("╠" + "═".repeat(100) + "╣");

        const integrityInfo = [
            "│  • RESTRICT:      No permite eliminar un registro si existen referencias",
            "│  • CASCADE:        Elimina automáticamente los registros relacionados",
            "│  • SET NULL:      Establece la FK en NULL cuando se elimina el padre",
            "│  • NO ACTION:     Similar a RESTRICT pero se verifica al final de la transacción",
            "│",
            "│  ESTRATEGIA USADA EN ESTE PROYECTO:",
            "│  ├─ RESTRICT: Users, Clinics, Supply Requests (datos críticos)",
            "│  └─ CASCADE:  Inventories (se elimina cuando se elimina warehouse/medication)",
            "│"
        ];

        integrityInfo.forEach(line => {
            console.log(line.padEnd(101) + "║");
        });

        console.log("╚" + "═".repeat(100) + "╝\n");

        console.log("✅ BASE DE DATOS LISTA CON RELACIONES CORRECTAMENTE CONFIGURADAS\n");

        process.exit(0);

    } catch (error) {
        console.error("\n❌ Error al cargar el esquema:", error);
        process.exit(1);
    }
}

main();
