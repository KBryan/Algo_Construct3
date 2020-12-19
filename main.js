var algoclient;
var account;
var mn;
// Put any global functions etc. here

runOnStartup(async runtime =>
{
    // Code to run on the loading screen.
    // Note layouts, objects etc. are not yet available.
    runtime.addEventListener("beforeprojectstart", () => OnBeforeProjectStart(runtime));
});

async function OnBeforeProjectStart(runtime)
{
    // Code to run just before 'On start of layout' on
    // the first layout. Loading has finished and initial
    // instances are created and available to use here.
    LoadExternalScriptAndWasm(runtime);
    runtime.addEventListener("tick", () => Tick(runtime));
}

async function LoadExternalScriptAndWasm(runtime)
{
    await LoadExternalScript(runtime);
}

async function LoadExternalScript(runtime)
{
    await runtime.assets.loadScripts("algosdk.js");
    // Algorand Client

    // Servers for connection to purestake
    let baseServerTestNet = 'https://testnet-algorand.api.purestake.io/ps2';
    let baseServerBetaNet = 'https://betanet-algorand.api.purestake.io/ps1';
    let baseServerMainNet = 'https://mainnet-algorand.api.purestake.io/ps1';
    let portPureStakePort = '';
    var token         = { 'X-API-key' : ''};


    // Algorand Sandbox
    let tokenAlgorandSandbox = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    let server = "http://localhost";
    let port = 4001;

    init();
    getStatus();
    getParams();

    async function getStatus(){
        const response = await algoclient.status().do();
        alert('Status: ' + JSON.stringify(response));
    }

    async function getParams(){

        let response = await algoclient.getTransactionParams().do();
        alert('Params ' + JSON.stringify(response));

    }

    function init() {

        algoclient = new algosdk.Algodv2(tokenAlgorandSandbox, server, port);
    }
}

async function createAccount() {
    account = algosdk.generateAccount();
    alert("Algo Account: " + account.addr);

}
async function privateKeyMnemonic() {
    mn = algosdk.secretKeyToMnemonic(account.sk);
    alert("Account Mnemonic: "  + mn);
}

function Tick(runtime)
{
    // Code to run every tick
}
