import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

/**
 * Represents the medication entity in the system.
 * @class medication
 * @extends {Model}
 */
export class medication extends Model {
    /** 
     * Unique auto-incrementing identifier for the warehouse.
     * @type {number} 
     */
    declare id: number;
     /** 
     * Official description of the medicine.
     * @type {string} 
     */
    declare description : string;
    /** 
     * Operational status of the medicine in the platform.
     * @type {boolean} 
     * @default true
     */
    declare active : boolean;
}
// Model initialization with Sequelize
medication.init(
    {
        /**
         * Auto-incrementing primary key of the warehouse.
         */
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        /**
         * description of the medication.
         */
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        /**
         * Controls whether the warehouse is active and available in the system.
         */
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false
        }
    },
    {
        sequelize: sequelize,
        tableName: "medications",
        timestamps: true, // Automatically enables createdAt and updatedAt
        paranoid: true    // Enables deletedAt for soft-delete
    }
);