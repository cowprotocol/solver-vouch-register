// SPDX-License-Identifier: LGPL-3.0-or-later
pragma solidity ^0.8;

contract VouchRegister {
    event Vouch(
        address indexed solver,
        address indexed bondingPool,
        address cowRewardTarget,
        address indexed txSender
    );
    event InvalidateVouch(
        address indexed solver,
        address indexed bondingPool,
        address indexed txSender
    );

    constructor() {}

    /// @dev Allows a bonding pool to officially vouch for a solver
    /// Anyone can call this function, but only the events where the txSender is the creator
    /// of the referenced bondingPool will be officially indexed
    /// The creator of a bonding pool is the official address that provides the funds to the bonding pool
    /// @param solver The solver for whom the bonding pool will cover potential losses/penalities
    /// @param bondingPool Address of the bonding pool from which a potential loss will be covered
    /// @param cowRewardTarget Address to which the solver COW Token reward should be send for the particular solver
    function vouch(
        address[] calldata solver,
        address[] calldata bondingPool,
        address[] calldata cowRewardTarget
    ) public {
        for (uint256 i = 0; i < solver.length; i++) {
            emit Vouch(
                solver[i],
                bondingPool[i],
                cowRewardTarget[i],
                msg.sender
            );
        }
    }

    /// @dev Invalidates the vouching for a solver by a bonding pool
    /// Anyone can call this function, but only the events where the txSender is the creator
    /// of the referenced bondingPool will be officially indexed
    /// The creator of a bonding pool is the official address that provides the funds to the bonding pool
    /// @param solver The solver for whom the bonding pool will no longer cover any losses/penalities
    /// @param bondingPool Address of the official bonding pool, from which a potential loss will no longer be covered
    function invalidateVouching(
        address[] calldata solver,
        address[] calldata bondingPool
    ) public {
        for (uint256 i = 0; i < solver.length; i++) {
            emit InvalidateVouch(solver[i], bondingPool[i], msg.sender);
        }
    }
}
