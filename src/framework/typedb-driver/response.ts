/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { Concept } from "./concept";
import { Database } from "./database";
import { QueryStructure } from "./query-structure";

export interface SignInResponse {
    token: string;
}

export interface DatabasesListResponse {
    databases: Database[];
}

export interface TransactionOpenResponse {
    transactionId: string;
}

export type QueryType = "read" | "write" | "schema";

export type AnswerType = "ok" | "conceptRows" | "conceptDocuments";

export interface ConceptRow {
    [varName: string]: Concept | undefined;
}

export interface ConceptRowAnswer {
    data: ConceptRow;
}

export type ConceptDocument = Object;

export type Answer = ConceptRowAnswer | ConceptDocument;

export interface QueryResponseBase {
    queryType: QueryType;
    answerType: AnswerType;
    queryStructure: QueryStructure | null;
    comment: string | null;
}

export interface OkQueryResponse extends QueryResponseBase {
    answerType: "ok";
}

export interface ConceptRowsQueryResponse extends QueryResponseBase {
    answerType: "conceptRows";
    answers: {
        provenanceBitArray: number[];
        data: ConceptRow
    }[];
}

export interface ConceptDocumentsQueryResponse extends QueryResponseBase {
    answerType: "conceptDocuments";
    answers: ConceptDocument[];
}

export type QueryResponse = OkQueryResponse | ConceptRowsQueryResponse | ConceptDocumentsQueryResponse;

export type ApiError = { code: string; message: string };

export interface ApiErrorResponse {
    err: ApiError;
    status: number;
}

export function isApiError(err: any): err is ApiError {
    return typeof err.code === "string" && typeof err.message === "string";
}

export type ApiResponse<OK_RES = {}> = { ok: OK_RES } | ApiErrorResponse;

export function isOkResponse(res: ApiResponse): res is { ok: {} } {
    return "ok" in res;
}

export function isApiErrorResponse(res: ApiResponse): res is ApiErrorResponse {
    return "err" in res;
}
