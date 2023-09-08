export function errorHandler (message) {
    let output = ""
    switch(errorMessageSplitter(message)) {
        case "execution reverted":
            output = "Execution reverted because user attempted to mint more than allowed"
            break
        case "missing revert data":
            output = "There is not enough ethereum to cover minting and gas fee"
            break
        case "user rejected action":
            output = "Transaction rejected by user"
            break
        case "events[0] is undefined":
            output = "Transaction is not done on correct chain network"
            break
        default:
            output = errorMessageSplitter(message) 
    }
    return output
}

export function errorMessageSplitter (message) {
    const split = message.split(" (")
    return split[0]
}