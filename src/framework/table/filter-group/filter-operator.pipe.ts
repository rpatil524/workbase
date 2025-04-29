/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { Pipe, PipeTransform } from "@angular/core";
import { FilterOperator, filterOperatorToString } from "../../../concept/common";

@Pipe({
    name: "filterOperator",
    standalone: true,
})
export class FilterOperatorPipe implements PipeTransform {
    transform(value: FilterOperator): string {
        return filterOperatorToString(value);
    }
}
