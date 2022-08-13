const getHtml = (token) => {
    let html = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Chain Height</title>
      </head>
      <body>
        <h1>Chain Height</h1>
        <div id="chainHeight">Loading...</div>
        <div id="auth">Auth...</div>
        <script type="module">
          import { LotusRPC } from 'https://unpkg.com/@filecoin-shipyard/lotus-client-rpc?module'
          import { BrowserProvider } from 'https://unpkg.com/@filecoin-shipyard/lotus-client-provider-browser?module'
          import { mainnet } from 'https://unpkg.com/@filecoin-shipyard/lotus-client-schema?module'
          // lotus localhost port
          const endpointUrl = 'ws://127.0.0.1:3453/rpc/v0'  // localhost lotus daemon
    
          const provider = new BrowserProvider(endpointUrl)
    
          const client = new LotusRPC(provider, { schema: mainnet.fullNode })
          // user token
          const auth = await client.authVerify("${token}")
          const authEl = document.getElementById('auth')
          authEl.textContent = auth[3]
    
          async function run () {
            const chainHeightEl = document.getElementById('chainHeight')  // chain height
            while (true) {
              const { Blocks: blocks, Cids: cids, Height: height } = await client.chainHead() // chain head
              chainHeightEl.textContent = height
              await new Promise(resolve => { setTimeout(resolve, 1000) }) // refresh every second
            }
          }
          run()
        </script>
      </body>
    </html>`;

    return html;
}

export default getHtml;