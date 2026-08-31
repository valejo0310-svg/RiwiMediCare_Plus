import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
/**
 * Represents a Supply Request model in the database.
 * @class SupplyRequest
 * @extends {Model}
 */
export class SupplyRequest extends Model {
  /**
   * The unique identifier for the supply request.
   * @type {number}
   */
  declare id: number;

  /**
   * The ID of the clinic making the request.
   * @type {number}
   */
  declare clinicId: number;

  /**
   * The ID of the requested medication.
   * @type {number}
   */
  declare medicationId: number;

  /**
   * The ID of the warehouse fulfilling the request.
   * @type {number}
   */
  declare warehouseId: number;

  /**
   * The number of medication units requested.
   * @type {number}
   */
  declare quantity: number;

  /**
   * The current status of the request (e.g., 'PENDING', 'APPROVED').
   * @type {string}
   */
  declare status: string;

  /**
   * The ID of the user who created the supply request.
   * @type {number}
   */
  declare createdBy: number;

  /**
   * Indicates whether the supply request record is active.
   * @type {boolean}
   */
  declare active: boolean;
}

/**
 * Initializes the SupplyRequest model schema and configuration options.
 */
SupplyRequest.init(
  {
    /** Unique primary key, auto-incremented. */
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    /** Foreign key referencing the clinic. */
    clinicId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    /** Foreign key referencing the requested medication. */
    medicationId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    /** Foreign key referencing the target warehouse. */
    warehouseId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    /** Total quantity of items requested. */
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    /** Current lifecycle state of the request. Defaults to 'PENDING'. */
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "PENDING"
    },
    /** Foreign key referencing the user who created the request. */
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    /** Flag for soft deletion or record availability. Defaults to true. */
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    /** Database connection instance. */
    sequelize,
    /** Name of the table in the database. */
    tableName: "supply_requests",
    /** Automatically adds createdAt and updatedAt fields. */
    timestamps: true,
    paranoid: true
  }
);

