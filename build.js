const fs = require('fs-extra')
const childProcess = require('child_process')
const path = require('path')

async function build() {
    try {
        await fs.remove(path.join(__dirname, 'dist'))

        const publicDir = path.join(__dirname, 'src', 'public')
        const viewsDir = path.join(__dirname, 'src', 'views')

        if (await fs.exists(publicDir)) {
            await fs.copy(publicDir, publicDir.replace('src', 'dist'))
        }

        if (await fs.exists(viewsDir)) {
            await fs.consolecopy(viewsDir, viewsDir.replace('src', 'dist'))
        }

        childProcess.exec('tsc --build tsconfig.json')
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

build()
