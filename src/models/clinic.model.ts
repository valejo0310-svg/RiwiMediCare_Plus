import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

/**
 * Represents a Clinic entity in the system.
 * Stores information about medical centers/branches and their responsible administrator.
 * 
 * @class Clinics
 * @extends {Model}
 */
export class clinics extends Model {
    /** 
     * Unique auto-incrementing identifier for the clinic.
     * @type {number} 
     */
    declare id: number;

    /** 
     * Commercial or institutional name of the clinic.
     * @type {string} 
     */
    declare name: string;

    /** 
     * ID of the user in charge or administrator of the clinic (Foreign Key).
     * @type {number} 
     */
    declare responsibleId: number;

    /** 
     * Activity status of the clinic in the platform.
     * @type {boolean} 
     * @default true
     */
    declare active: boolean;

    /** 
     * Clinic registration date (Automatically generated).
     * @type {Date} 
     */
    declare createdAt: Date;

    /** 
     * Date of the last modification of data (Automatically generated).
     * @type {Date} 
     */
    declare updatedAt: Date;

    /** 
     * Inactivation or logical deletion date (Paranoid mode).
     * @type {Date | null} 
     */
    declare deletedAt: Date | null;
}

// Model initialization with Sequelize
clinics.init(
    {
        /**
         * Auto-incrementing primary key of the clinic.
         */
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        /**
         * Official name of the medical center.
         */
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        /**
         * ID of the responsible user. Links this clinic to a record in the 'users' table.
         */
        responsibleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id"
            }
        },
        /**
         * Controls whether the clinic is operational or disabled in the system workflow.
         */
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false
        }
    },
    {
        sequelize: sequelize,
        tableName: "clinics",
        timestamps: true, // Enables createdAt and updatedAt
        paranoid: true    // Enables deletedAt for soft-delete
    }
);
