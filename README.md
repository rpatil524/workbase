[![TypeDB Studio](./docs/images/typedb_banner.png)](https://typedb.com/docs/typedb/connecting/studio)

[![Factory](https://factory.vaticle.com/api/status/typedb/typedb-studio/badge.svg)](https://factory.vaticle.com/typedb/typedb-studio)
[![GitHub release](https://img.shields.io/github/release/typedb/typedb-studio.svg)](https://github.com/typedb/typedb-studio/releases/latest)
[![Discord](https://img.shields.io/discord/665254494820368395?color=7389D8&label=chat&logo=discord&logoColor=ffffff)](https://typedb.com/discord)
[![Discussion Forum](https://img.shields.io/badge/discourse-forum-blue.svg)](https://forum.typedb.com)
[![Stack Overflow](https://img.shields.io/badge/stackoverflow-typedb-796de3.svg)](https://stackoverflow.com/questions/tagged/typedb)
[![Stack Overflow](https://img.shields.io/badge/stackoverflow-typeql-3dce8c.svg)](https://stackoverflow.com/questions/tagged/typeql)

# Introducing TypeDB Studio

TypeDB Studio is the IDE for developing with **[TypeDB](https://github.com/typedb/typedb)**. It provides a consistent experience across different environments, including macOS, Linux, and Windows. With Studio, developers can easily manage databases, execute queries, and explore query results, all within a unified interface.

- [Install TypeDB Studio](https://typedb.com/docs/home/install-tools#_studio)
- For a quick overview of TypeDB Studio, check out the [manual](https://typedb.com/docs/manual/tools/studio).
- Discover more of TypeDB’s unique [features](https://typedb.com/features).


[![Manage Database Schemas](./docs/images/create.gif)](./docs/images/create.gif)

## Features

TypeDB Studio helps you get started developing with TypeDB faster:

- Graphical user interface for connecting to TypeDB without the use of command line tools, libraries, or Driver API.
- Database manager to create and delete databases.
- Project file management to store your favorite queries.
- Convenient multi-tab query editor with TypeQL syntax highlighting, auto-saving, query execution, response output, 
  and pop-up notifications for warnings and error messages that may occur during runtime/query execution.
- Automatic transaction management with full GUI control, including read/write/schema transactions, as 
  well as transaction control (commit/rollback/close).

## Download TypeDB Studio

You can download TypeDB Studio from the [GitHub Releases](https://github.com/typedb/typedb-studio/releases) page.
For more information on how to install and run TypeDB Studio, see the 
[Installation guide](https://typedb.com/docs/home/install-tools#_studio).

## Compile from source

> Note: For precompiled releases, simply download TypeDB Studio following the _"Download TypeDB Studio"_ section above.

1. Make sure you have the following dependencies installed on your machine:
    - Java JDK 11 or higher
    - [Bazel 6 or higher](https://bazel.build/install).
 
2. You can build TypeDB with either one of the following commands, depending on the targeted architecture and 
   operating system: 
   ```sh
   $ bazel run //:studio-bin-mac-arm64
   $ bazel run //:studio-bin-mac-x86_64
   ```
   ```sh
   $ bazel run //:studio-bin-windows-x86_64
   ```
   ```sh
   $ bazel run //:studio-bin-linux-arm64
   $ bazel run //:studio-bin-linux-x86_64
   ```
   You can also replace `run` with `build` in the command above, and Bazel will simply produce the JAR for TypeDB Studio
   under `bazel-bin/studio-bin-mac-x86_64.jar` or similar directory, with respect to the chosen OS and architecture.

## Useful links

If you want to begin your journey with TypeDB, you can explore the following resources:

* In-depth dive into TypeDB's [philosophy](https://typedb.com/philosophy)
* Our [TypeDB quickstart](https://typedb.com/docs/typedb/quickstart-guide)
* Our [TypeDB Studio documentation](https://typedb.com/docs/manual/tools/studio)
* **[TypeQL](https://github.com/typedb/typeql)**
* **[TypeDB](https://github.com/typedb/typedb)**

## Contributions

TypeDB Studio has been built using various open-source frameworks, technologies and communities throughout its 
evolution. Today TypeDB Studio is built
using [Kotlin](https://kotlinlang.org),
[Compose Multiplatform](https://github.com/JetBrains/compose-jb),
and [Bazel](https://bazel.build).

Thank you!

## Licensing

This software is released under the Mozilla Public License 2.0 (MPL 2.0).
For license information, please see [LICENSE](https://github.com/typedb/typedb-studio/blob/master/LICENSE). 
