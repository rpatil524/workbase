/*
 * Copyright (C) 2021 Grakn Labs
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 */

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    runtimeCompiler: true,
    configureWebpack: {
        devtool: 'source-map',
    },
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            builderOptions: {
                appId: 'com.graknlabs.workbase',
                productName: 'Grakn Workbase',
                artifactName: 'grakn-workbase-${os}-${version}.${ext}',
                win: {
                    publish: null,
                },
                mac: {
                    publish: null,
                    hardenedRuntime: true,
                    gatekeeperAssess: false,
                    entitlements: 'build/entitlements.mac.plist',
                    entitlementsInherit: 'build/entitlements.mac.plist',
                },
                linux: {
                    publish: null,
                },
                afterSign: 'scripts/notarize.js',
            },
        }
    }
}
