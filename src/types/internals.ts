import { Router } from "express";

export interface RouterConfig {
    path:   string;
    router: Router;
}