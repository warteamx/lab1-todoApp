{
    "ReservationId": "r-0aa97370cee80246a",
    "OwnerId": "936921399239",
    "Groups": [],
    "Instances": [
        {
            "Architecture": "x86_64",
            "BlockDeviceMappings": [],
            "ClientToken": "771c63aa-5980-42d2-a8e6-2fac66c8846f",
            "EbsOptimized": false,
            "EnaSupport": true,
            "Hypervisor": "xen",
            "NetworkInterfaces": [
                {
                    "Attachment": {
                        "AttachTime": "2025-08-30T16:19:57+00:00",
                        "AttachmentId": "eni-attach-0f39c51d1b9c9ca05",
                        "DeleteOnTermination": true,
                        "DeviceIndex": 0,
                        "Status": "attaching",
                        "NetworkCardIndex": 0
                    },
                    "Description": "",
                    "Groups": [
                        {
                            "GroupId": "sg-0897516bc7993d832",
                            "GroupName": "lab1-todoapp-sg"
                        }
                    ],
                    "Ipv6Addresses": [],
                    "MacAddress": "06:73:a5:c7:6f:a1",
                    "NetworkInterfaceId": "eni-07be1937f69ee4809",
                    "OwnerId": "936921399239",
                    "PrivateDnsName": "ip-172-31-27-207.eu-north-1.compute.internal",
                    "PrivateIpAddress": "172.31.27.207",
                    "PrivateIpAddresses": [
                        {
                            "Primary": true,
                            "PrivateDnsName": "ip-172-31-27-207.eu-north-1.compute.internal",
                            "PrivateIpAddress": "172.31.27.207"
                        }
                    ],
                    "SourceDestCheck": true,
                    "Status": "in-use",
                    "SubnetId": "subnet-0618ec603036f2187",
                    "VpcId": "vpc-0ef71a31b59da363e",
                    "InterfaceType": "interface",
                    "Operator": {
                        "Managed": false
                    }
                }
            ],
            "RootDeviceName": "/dev/sda1",
            "RootDeviceType": "ebs",
                        "RootDeviceType": "ebs",
            "SecurityGroups": [
                {
                    "GroupId": "sg-0897516bc7993d832",
                    "GroupName": "lab1-todoapp-sg"
                }
            ],
            "SourceDestCheck": true,
            "StateReason": {
                "Code": "pending",
                "Message": "pending"
            },
            "Tags": [
                {
                    "Key": "Name",
                    "Value": "lab1-todoapp-server"
                }
            ],
            "VirtualizationType": "hvm",
            "CpuOptions": {
                "CoreCount": 1,
                "ThreadsPerCore": 2
            },
            "CapacityReservationSpecification": {
                "CapacityReservationPreference": "open"
            },
            "MetadataOptions": {
                "State": "pending",
                "HttpTokens": "optional",
                "HttpPutResponseHopLimit": 1,
                "HttpEndpoint": "enabled",
                "HttpProtocolIpv6": "disabled",
                "InstanceMetadataTags": "disabled"
            },
            "EnclaveOptions": {
                "Enabled": false
            },
            "BootMode": "uefi-preferred",
            "PrivateDnsNameOptions": {
                "HostnameType": "ip-name",
                "EnableResourceNameDnsARecord": false,
                "EnableResourceNameDnsAAAARecord": false
            },
            "MaintenanceOptions": {
                "AutoRecovery": "default",
                "RebootMigration": "default"
            },
            "CurrentInstanceBootMode": "uefi",
            "Operator": {
                "Managed": false
            },
            "InstanceId": "i-046d4e1e286e3032d",
            "ImageId": "ami-07e075f00c26b085a",
            "State": {
                "Code": 0,
                "Name": "pending"
:            },
            "PrivateDnsName": "ip-172-31-27-207.eu-north-1.compute.internal",
            "PublicDnsName": "",
            "StateTransitionReason": "",
            "KeyName": "lab1-todoapp-key",
            "AmiLaunchIndex": 0,
            "ProductCodes": [],
            "InstanceType": "t3.micro",
            "LaunchTime": "2025-08-30T16:19:57+00:00",
            "Placement": {
                "AvailabilityZoneId": "eun1-az1",
                "GroupName": "",
                "Tenancy": "default",
                "AvailabilityZone": "eu-north-1a"
            },
            "Monitoring": {
                "State": "disabled"
            },
            "SubnetId": "subnet-0618ec603036f2187",
            "VpcId": "vpc-0ef71a31b59da363e",
            "PrivateIpAddress": "172.31.27.207"
        }
    ]
}
