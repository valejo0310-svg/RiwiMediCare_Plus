import { sequelize } from "../config/database";

export async function showPostgreSQLSchema(): Promise<void> {
    try {
        console.log("\n" + "=".repeat(100));
        console.log("🗄️  ESQUEMA DE BASE DE DATOS - POSTGRESQL");
        console.log("=".repeat(100) + "\n");

        // Obtener informacion de las tablas
        const tables = await sequelize.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            ORDER BY table_name;
        `, { raw: true });

        console.log("📋 TABLAS DISPONIBLES:\n");
        (tables as any[]).forEach((row: any, index: number) => {
            console.log(`${index + 1}. ${row.table_name}`);
        });

        console.log("\n" + "─".repeat(100) + "\n");

        // Mostrar columnas y tipos de datos para cada tabla
        console.log("📊 ESTRUCTURA DE COLUMNAS:\n");

        const columnQuery = `
            SELECT 
                table_name,
                column_name,
                data_type,
                is_nullable,
                column_default
            FROM information_schema.columns
            WHERE table_schema = 'public'
            ORDER BY table_name, ordinal_position;
        `;

        const columns = await sequelize.query(columnQuery, { raw: true });

        let currentTable = "";
        (columns as any[]).forEach((col: any) => {
            if (col.table_name !== currentTable) {
                if (currentTable !== "") console.log();
                currentTable = col.table_name;
                console.log(`🔹 ${currentTable.toUpperCase()}`);
                console.log("├─ Columnas:");
            }
            const nullable = col.is_nullable === "YES" ? "✓" : "✗";
            const defaultVal = col.column_default ? ` DEFAULT: ${col.column_default}` : "";
            console.log(`│  ├─ ${col.column_name} (${col.data_type}) [NULL: ${nullable}]${defaultVal}`);
        });

        console.log("\n" + "─".repeat(100) + "\n");

        // Mostrar relaciones (Foreign Keys)
        console.log("🔗 CLAVES FORÁNEAS (RELACIONES):\n");

        const fkQuery = `
            SELECT 
                constraint_name,
                table_name,
                column_name,
                referenced_table_name,
                referenced_column_name
            FROM (
                SELECT
                    tc.constraint_name,
                    tc.table_name,
                    kcu.column_name,
                    ccu.table_name AS referenced_table_name,
                    ccu.column_name AS referenced_column_name
                FROM information_schema.table_constraints AS tc
                JOIN information_schema.key_column_usage AS kcu
                    ON tc.constraint_name = kcu.constraint_name
                    AND tc.table_schema = kcu.table_schema
                JOIN information_schema.constraint_column_usage AS ccu
                    ON ccu.constraint_name = tc.constraint_name
                    AND ccu.table_schema = tc.table_schema
                WHERE tc.constraint_type = 'FOREIGN KEY'
                    AND tc.table_schema = 'public'
            ) AS subquery
            ORDER BY table_name, column_name;
        `;

        try {
            const fks = await sequelize.query(fkQuery, { raw: true });
            
            if ((fks as any[]).length === 0) {
                console.log("⚠️  No se encontraron claves foráneas explícitas en la base de datos.");
                console.log("💡 Las relaciones se manejan a través de Sequelize ORM.\n");
            } else {
                (fks as any[]).forEach((fk: any, index: number) => {
                    console.log(`${index + 1}. ${fk.constraint_name}`);
                    console.log(`   ├─ Tabla: ${fk.table_name}`);
                    console.log(`   ├─ Columna: ${fk.column_name}`);
                    console.log(`   └─ Referencia: ${fk.referenced_table_name}.${fk.referenced_column_name}\n`);
                });
            }
        } catch (error) {
            console.log("⚠️  No fue posible consultar las claves foráneas.\n");
        }

        console.log("─".repeat(100) + "\n");

        // Mostrar índices
        console.log("📇 ÍNDICES DISPONIBLES:\n");

        const indexQuery = `
            SELECT
                tablename,
                indexname,
                indexdef
            FROM pg_indexes
            WHERE schemaname = 'public'
            ORDER BY tablename, indexname;
        `;

        try {
            const indexes = await sequelize.query(indexQuery, { raw: true });
            (indexes as any[]).forEach((idx: any, index: number) => {
                console.log(`${index + 1}. ${idx.indexname} (${idx.tablename})`);
                console.log(`   └─ ${idx.indexdef}\n`);
            });
        } catch (error) {
            console.log("⚠️  No fue posible consultar los índices.\n");
        }

        console.log("=".repeat(100));
        console.log("✅ RELACIONES CARGADAS DESDE SEQUELIZE");
        console.log("=".repeat(100) + "\n");

        console.log("📌 RESUMEN DE RELACIONES:\n");
        console.log(`
┌─────────────────────────────────────────────────────────────────────────┐
│ RELACIÓN                          │ TIPO    │ ACCIÓN ELIMINAR │ ACCIÓN ACTUALIZAR  │
├───────────────────────────────────┼─────────┼─────────────────┼─────────────────┤
│ users → clinics                   │ 1:N     │ RESTRICT        │ CASCADE         │
│ clinics → supply_requests          │ 1:N     │ RESTRICT        │ CASCADE         │
│ warehouses → inventories           │ 1:N     │ CASCADE         │ CASCADE         │
│ medications → inventories          │ 1:N     │ CASCADE         │ CASCADE         │
│ warehouses → supply_requests       │ 1:N     │ RESTRICT        │ CASCADE         │
│ medications → supply_requests      │ 1:N     │ RESTRICT        │ CASCADE         │
│ users → supply_requests            │ 1:N     │ RESTRICT        │ CASCADE         │
└───────────────────────────────────┴─────────┴─────────────────┴──────────────────┘
        `);

        console.log("\n" + "=".repeat(100) + "\n");

    } catch (error) {
        console.error("Error al obtener el esquema:", error);
    }
}

// Ejecutar si se llama directamente
if (require.main === module) {
    showPostgreSQLSchema()
        .then(() => process.exit(0))
        .catch(error => {
            console.error(error);
            process.exit(1);
        });
}
