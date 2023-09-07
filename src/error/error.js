export function errorHandler (message) {
    let output = ""
    switch(errorMessageSplitter(message)) {
        case "execution reverted":
            output = "This address has minted the max amount. No minting allowed"
            break
        case "missing revert data":
            output = "There is not enough ethereum to cover minting and gas fee"
            break
        case "user rejected action":
            output = "User rejected transaction"
            break
        case "events[0] is undefined":
            output = "Transaction is not done on correct chain network"
            break
        default:
            output = "There is an error"  
    }
    return output
}

export function errorMessageSplitter (message) {
    const split = message.split(" (")
    return split[0]
}