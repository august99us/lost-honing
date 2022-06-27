import React from 'react';
import { GearSelector } from '../../components';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { Gear } from '../../types/global.d';

const testGear: Gear[] = [
    new Gear('1340weap', '1340 Weapon', ['Tier 3', 'IL1340']),
    new Gear('1340armor', '1340 Armor', ['Tier 3', 'IL1340']),
    new Gear('302weap', '302 Weapon', ['Tier 1', 'IL302']),
    new Gear('302armor', '302 Armor', ['Tier 1', 'IL302']),
    new Gear('802weap', '802 Weapon', ['Tier 2', 'IL802']),
    new Gear('802armor', '802 Armor', ['Tier 2', 'IL802']),
    new Gear('1302weap', '1302 Weapon', ['Tier 3', 'IL1302']),
    new Gear('1302armor', '1302 Armor', ['Tier 3', 'IL1302']),
];

const HomePage = () => {
    return <GearSelector gear={testGear} />;
};

export default HomePage;
