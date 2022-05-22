import "@testing-library/jest-dom/extend-expect";
import axios from "axios";

axios.defaults.adapter = require("axios/lib/adapters/http");

// NextJS Router setup
import mockRouter from "next-router-mock";
jest.mock("next/router", () => require("next-router-mock"));

beforeEach(() => {
	mockRouter.setCurrentUrl("/initial");
});
