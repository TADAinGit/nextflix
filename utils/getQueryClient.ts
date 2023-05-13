import { QueryClient } from "@tanstack/query-core";
import React, { cache } from "react";

type Props = {};

const getQueryClient = cache(() => new QueryClient());

export default getQueryClient;
